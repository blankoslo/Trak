import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Checkbox, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import safeJsonStringify from 'safe-json-stringify';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '40px',
  },
  header_text_group: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    backgroundColor: 'yellow',
    padding: '2px',
  },
  task: {},
}));

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const parsedId = typeof id === 'string' && parseInt(id);

  const employeeQuery = await trakClient.employee.findUnique({
    where: {
      id: parsedId,
    },
    include: {
      profession: true,
      employeeTask: {
        where: {
          dueDate: {
            lte: new Date(),
          },
        },
        include: {
          task: {
            include: {
              phase: {
                include: {
                  processTemplate: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const employee = JSON.parse(safeJsonStringify(employeeQuery));

  return { props: { employee } };
};

const Employee = ({ employee }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const done = 1;
  const total = 4;
  return (
    <>
      <Head>
        <title>Ansatt</title>
      </Head>
      <>
        <div className={classes.header}>
          <Badge
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            badgeContent={
              <div className={classes.avatar}>
                {done}/{total}
              </div>
            }
            overlap='circular'>
            <Avatar alt={`${employee.firstName} ${employee.lastName}`} src={employee.imageUrl} sx={{ width: 132, height: 132 }} />
          </Badge>
          <div className={classes.header_text_group}>
            <Typography>{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Typography>{`Begynner ${employee.dateOfEmployment}`}</Typography>
            <Typography>{employee.profession.title}</Typography>
          </div>
        </div>

        <div>
          <Accordion>
            <AccordionSummary aria-controls='TASK1_RENAME_ME_PLEASE' className={classes.header} expandIcon={<ExpandMore />} id='TASK1_RENAME_ME_PLEASE'>
              <Checkbox onClick={(e) => e.stopPropagation()} />
              <Typography>{employee.employeeTask[0].task.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    </>
  );
};

export default Employee;
