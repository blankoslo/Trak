import ExpandMore from '@mui/icons-material/ExpandMore';
import Launch from '@mui/icons-material/Launch';
import Mail from '@mui/icons-material/Mail';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from 'components/Avatar';
import Comments from 'components/Comments';
import DateFormater from 'components/DateFormater';
import Markdown from 'components/Markdown';
import EditDueDateModal from 'components/modals/EditDueDateModal';
import EditResponsibleModal from 'components/modals/EditResponsibleModal';
import useSnackbar from 'context/Snackbar';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import startOfYear from 'date-fns/startOfYear';
import { trakClient } from 'lib/prisma';
import { chain } from 'lodash';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { Process } from 'utils/types';
import { prismaDateToFormatedDate, toggleCheckBox } from 'utils/utils';
import validator from 'validator';
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const parsedId = typeof id === 'string' && parseInt(id);

  const employeeQuery = await trakClient.employee.findUnique({
    where: {
      id: parsedId,
    },
    include: {
      profession: true,
      employee_tasks: {
        orderBy: [
          {
            due_date: 'asc',
          },
          {
            responsible: {
              id: 'asc',
            },
          },
          {
            task: {
              title: 'asc',
            },
          },
        ],
        where: {
          OR: [
            {
              task: {
                phase: {
                  process_template_id: Process.LOPENDE,
                },
              },
              due_date: {
                gte: startOfYear(new Date()),
              },
            },
            {
              task: {
                phase: {
                  OR: [
                    {
                      process_template_id: Process.ONBOARDING,
                    },
                    {
                      process_template_id: Process.OFFBOARDING,
                    },
                  ],
                },
              },
            },
          ],
        },
        include: {
          completed_by: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
          responsible: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              image_url: true,
            },
          },
          task: {
            include: {
              phase: {
                include: {
                  process_template: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const employee = JSON.parse(safeJsonStringify(employeeQuery));
  const tasks = chain(employee.employee_task)
    .groupBy('task.phase.process_template_id')
    .map((value, key) => ({ title: key, tasks: value }))
    .value()
    .map((process) => {
      return {
        title: process.title,
        phases: chain(process.tasks)
          .groupBy('task.phase.title')
          .map((value, key) => ({ title: key, tasks: value }))
          .value(),
      };
    });

  const processTemplates = await trakClient.process_template.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
  return { props: { employee, tasks, processTemplates } };
};

const Employee = ({ employee, tasks, processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { process } = router.query;
  const getTitle = (slug) => {
    return processTemplates.find((processTemplate) => processTemplate.slug === slug).title;
  };

  const hasStarted = differenceInCalendarDays(new Date(employee.dateOfEmployment), new Date()) <= 0;

  return (
    <>
      <Head>
        <title>{`${employee.first_name} ${employee.last_name}`}</title>
      </Head>
      <Container maxWidth='md' sx={{ paddingTop: '30px', marginBottom: 12 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '40px',
            paddingBottom: '30px',
          }}
        >
          <MuiAvatar alt={`${employee.first_name} ${employee.last_name}`} src={employee.image_url} sx={{ width: 132, height: 132 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h3'>{`${employee.first_name} ${employee.last_name}`}</Typography>
            <Typography>{`${hasStarted ? 'Begynte' : 'Begynner'} ${prismaDateToFormatedDate(employee.date_of_employment)}`}</Typography>
            <Typography>{employee.profession.title}</Typography>
          </Box>
        </Box>
        <Stack direction='row' justifyContent={'flex-end'} spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          {tasks.map((value, index) => (
            <Fragment key={value.slug}>
              <Typography
                key={value.slug}
                onClick={() => router.push({ pathname: `/ansatt/${employee.id}`, query: { process: value.title } }, undefined, { shallow: true })}
                sx={
                  value.title === process
                    ? {
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        textDecorationColor: 'primary.main',
                        textUnderlineOffset: '8px',
                      }
                    : { fontSize: '1rem', cursor: 'pointer' }
                }
              >
                {getTitle(value.title)}
              </Typography>
              {index < tasks.length - 1 && <Typography sx={{ color: 'primary.main', fontSize: '1.25rem' }}>/</Typography>}
            </Fragment>
          ))}
        </Stack>
        {tasks
          .find((task) => task.title === process)
          ?.phases?.map((phase) => (
            <>
              <Typography gutterBottom variant='h3'>
                {phase.title}
              </Typography>
              {phase.tasks.map((task, index) => (
                <Task employeeId={employee.id} employeeTask={task} key={index} />
              ))}
            </>
          ))}
      </Container>
    </>
  );
};
export const Task = ({ employeeTask, employeeId }) => {
  const [completed, setCompleted] = useState<boolean>(employeeTask.completed);
  const [loading, isLoading] = useState<boolean>(false);
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const accordianBackgroundColor = 'rgba(255, 255, 255, 0.2)';

  useEffect(() => {
    setCompleted(employeeTask.completed);
  }, [employeeTask, employeeTask.completed]);

  const checkboxClicked = async (e) => {
    isLoading(true);
    e.stopPropagation();
    await toggleCheckBox(employeeTask, completed, setCompleted, showSnackbar);
    isLoading(false);
    router.push({ pathname: `/ansatt/${employeeId}`, query: { process: employeeTask.task.phase.process_template.slug } }, undefined, {
      shallow: false,
      scroll: false,
    });
  };

  const hasExpired = differenceInCalendarDays(new Date(employeeTask.due_date), new Date()) < 0;

  return (
    <>
      {loading && <LinearProgress />}
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        disableGutters
        sx={{
          marginBottom: '16px',
          borderRadius: '4px',
          backgroundColor: completed ? 'background.default' : hasExpired && !completed ? 'error.dark' : 'background.paper',
        }}
      >
        <AccordionSummary
          aria-controls='TASK1_RENAME_ME_PLEASE'
          expandIcon={
            <IconButton>
              <ExpandMore sx={{ color: 'primary.main' }} />
            </IconButton>
          }
          id='TASK1_RENAME_ME_PLEASE'
        >
          {isSmallScreen ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Checkbox
                checked={completed}
                onClick={checkboxClicked}
                sx={{
                  color: 'primary.main',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Box>
                  <Typography>{employeeTask.task.title}</Typography>
                  <DateFormater date={employeeTask.due_date} />
                  <Typography>{`${employeeTask.responsible.first_name} ${employeeTask.responsible.last_name}`}</Typography>
                </Box>
                {employeeTask?.task?.link && (
                  <a href={`${validator.isEmail(employeeTask.task.link) ? 'mailto:' : ''}${employeeTask.task.link}`} rel='noopener noreferrer' target='_blank'>
                    <IconButton disableFocusRipple onClick={(e) => e.stopPropagation()} size='small'>
                      {validator.isEmail(employeeTask.task.link) ? <Mail color='primary' /> : <Launch color='primary' />}
                    </IconButton>
                  </a>
                )}
              </Box>
            </Box>
          ) : (
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
                {employeeTask?.task?.link && (
                  <a href={`${validator.isEmail(employeeTask.task.link) ? 'mailto:' : ''}${employeeTask.task.link}`} rel='noopener noreferrer' target='_blank'>
                    <IconButton disableFocusRipple onClick={(e) => e.stopPropagation()} size='small'>
                      {validator.isEmail(employeeTask.task.link) ? <Mail color='primary' /> : <Launch color='primary' />}
                    </IconButton>
                  </a>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <DateFormater date={employeeTask.due_date} />
                <Avatar
                  firstName={employeeTask.responsible.first_name}
                  image={employeeTask.responsible.image_url}
                  lastName={employeeTask.responsible.last_name}
                ></Avatar>
              </Box>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: accordianBackgroundColor,
          }}
        >
          {employeeTask.completed_by_id && (
            <>
              <Typography variant='body2'>{`Fullført den ${prismaDateToFormatedDate(employeeTask.completed_date)}`}</Typography>
              <Typography gutterBottom variant='body2'>{`av ${employeeTask.completed_by.first_name} ${employeeTask.completed_by.last_name}`}</Typography>
            </>
          )}
          <Typography variant='body2'>{`Oppgaveansvarlig: ${employeeTask.responsible.first_name} ${employeeTask.responsible.last_name}`}</Typography>
          <Typography variant='body2'>{`Prosess: ${employeeTask.task.phase.process_template.title}`}</Typography>
          <Typography gutterBottom variant='body2'>{`Fase: ${employeeTask.task.phase.title}`}</Typography>
          <Markdown text={employeeTask?.task.description} />
          <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
            Kommentarer:
          </Typography>
          <Comments employeeTask={employeeTask} />
        </AccordionDetails>
        <AccordionActions
          sx={{
            justifyContent: 'start',
            bgcolor: accordianBackgroundColor,
          }}
        >
          <EditResponsibleButton employeeTask={employeeTask} />
          <EditDueDateButton employeeTask={employeeTask} />
        </AccordionActions>
      </Accordion>
    </>
  );
};

export const EditResponsibleButton = ({ employeeTask, fullWidth = false }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Button
        aria-label='Åpne endre oppgaveansvarlig modal'
        disabled={employeeTask.completed}
        fullWidth={fullWidth}
        onClick={() => setIsModalOpen(true)}
        type='button'
        variant='contained'
      >
        Endre oppgaveansvarlig
      </Button>
      <EditResponsibleModal closeModal={closeModal} employeeTask={employeeTask} isModalOpen={isModalOpen} />
    </>
  );
};
const EditDueDateButton = ({ employeeTask }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Button
        aria-label='Åpne endre forfallsdato modal'
        disabled={employeeTask.completed}
        onClick={() => setIsModalOpen(true)}
        type='button'
        variant='contained'
      >
        Endre forfallsdato
      </Button>
      <EditDueDateModal closeModal={closeModal} employeeTask={employeeTask} isModalOpen={isModalOpen} />
    </>
  );
};

export default Employee;
