import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Checkbox, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import useSnackbar from 'context/Snackbar';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { prismaDateToFormatedDate, toggleCheckBox } from 'utils/utils';

const useStyles = makeStyles((theme: Theme) => ({
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
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
          OR: [
            {
              dueDate: {
                lte: new Date(),
              },
            },
            {
              completed: {
                equals: false,
              },
            },
          ],
        },
        include: {
          responsible: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
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

  const done = employee.employeeTask.filter((task) => task.completed).length;
  const total = employee.employeeTask.length;
  const hasStarted = new Date(employee.dateOfEmployment) < new Date();
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
            <Typography variant='h3'>{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Typography>{`${hasStarted ? 'Begynte' : 'Begynner'} ${prismaDateToFormatedDate(employee.dateOfEmployment)}`}</Typography>
            <Typography>{employee.profession.title}</Typography>
          </div>
        </div>
        {employee.employeeTask.map((employeeTask, index) => (
          <Task employeeTask={employeeTask} key={index} />
        ))}
      </>
    </>
  );
};

const Task = ({ employeeTask }) => {
  const [completed, setCompleted] = useState<boolean>(employeeTask.completed);
  const showSnackbar = useSnackbar();

  const checkboxClicked = (e) => {
    e.stopPropagation();
    toggleCheckBox(employeeTask, completed, setCompleted, showSnackbar);
  };
  return (
    <>
      <Accordion disableGutters sx={{ marginBottom: '16px', borderRadius: '4px' }}>
        <AccordionSummary aria-controls='TASK1_RENAME_ME_PLEASE' expandIcon={<ExpandMore />} id='TASK1_RENAME_ME_PLEASE'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Checkbox
                checked={completed}
                onClick={checkboxClicked}
                sx={{
                  color: 'primary.main',
                }}
              />
              <Typography>{employeeTask.task.title}</Typography>
            </Box>
            <Typography>{prismaDateToFormatedDate(employeeTask.dueDate)}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}>
          <Typography variant='body2'>{employeeTask.task.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Employee;
