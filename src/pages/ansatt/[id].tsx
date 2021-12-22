import { TextareaAutosize } from '@mui/base';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Checkbox, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useSnackbar from 'context/Snackbar';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { prismaDateToFormatedDate, toggleCheckBox } from 'utils/utils';
import safeJsonStringify from 'safe-json-stringify';

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

  const processTemplates = await trakClient.processTemplate.findMany({
    select: {
      slug: true,
      title: true,
    },
  });

  return { props: { employee, processTemplates } };
};

const Employee = ({ employee, processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [choosenProcess, setChoosenProcess] = useState([]);

  const handleFormat = (_, newFormats) => {
    if (newFormats.length === processTemplates.length) {
      setChoosenProcess([]);
    } else {
      setChoosenProcess(newFormats);
    }
  };

  const hasStarted = new Date(employee.dateOfEmployment) < new Date();
  return (
    <>
      <Head>
        <title>Ansatt</title>
      </Head>
      <Container sx={{ paddingTop: '30px' }} maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '40px',
            paddingBottom: '30px',
          }}
        >
          <Avatar alt={`${employee.firstName} ${employee.lastName}`} src={employee.imageUrl} sx={{ width: 132, height: 132 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h3'>{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Typography>{`${hasStarted ? 'Begynte' : 'Begynner'} ${prismaDateToFormatedDate(employee.dateOfEmployment)}`}</Typography>
            <Typography>{employee.profession.title}</Typography>
          </Box>
        </Box>

        <ToggleButtonGroup onChange={handleFormat} sx={{ marginBottom: '30px' }} value={choosenProcess}>
          {processTemplates?.map((processTemplate) => (
            <ToggleButton
              key={processTemplate.slug}
              sx={{
                '&$selected': {
                  color: 'text.secondary',
                  backgroundColor: 'primary.main',
                },
              }}
              value={processTemplate.title}
            >
              {processTemplate.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {!employee.employeeTask?.length
          ? 'Gratulerer. Finnes ingen flere oppgaver :D'
          : employee.employeeTask
              .filter((employeeTask) =>
                !choosenProcess?.length
                  ? true
                  : choosenProcess?.some((processTemplate) => {
                      return processTemplate === employeeTask.task.phase.processTemplate.title;
                    }),
              )
              .map((employeeTask, index) => <Task employeeTask={employeeTask} key={index} />)}
      </Container>
    </>
  );
};

export const Task = ({ employeeTask }) => {
  const [completed, setCompleted] = useState<boolean>(employeeTask.completed);
  const showSnackbar = useSnackbar();
  const [showCommentField, setShowCommentField] = useState<boolean>(false);

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
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
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
          }}
        >
          <Typography variant='body2'>{employeeTask.task.description}</Typography>
          {showCommentField ? (
            <TextareaAutosize />
          ) : (
            <Button onClick={() => setShowCommentField(true)} size='small' variant='contained'>
              Skriv ny kommentar
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Employee;
