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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from 'components/Avatar';
import Comments from 'components/Comments';
import DateFormater from 'components/DateFormater';
import EditDueDateModal from 'components/modals/EditDueDateModal';
import EditResponsibleModal from 'components/modals/EditResponsibleModal';
import TextMarkDownWithLink from 'components/TextMarkDownWithLink';
import useSnackbar from 'context/Snackbar';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import startOfDay from 'date-fns/startOfDay';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
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
      employeeTask: {
        orderBy: [
          {
            dueDate: 'asc',
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
              dueDate: {
                gte: startOfDay(new Date()),
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
          completedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          responsible: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              imageUrl: true,
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
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const handleFormat = (_, newFormats) => {
    if (newFormats.length === processTemplates.length) {
      setChoosenProcess([]);
    } else {
      setChoosenProcess(newFormats);
    }
  };

  const hasStarted = differenceInCalendarDays(new Date(employee.dateOfEmployment), new Date()) <= 0;

  return (
    <>
      <Head>
        <title>{`${employee.firstName} ${employee.lastName}`}</title>
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
          <MuiAvatar alt={`${employee.firstName} ${employee.lastName}`} src={employee.imageUrl} sx={{ width: 132, height: 132 }} />
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'start' },
          }}
        >
          <ToggleButtonGroup
            onChange={handleFormat}
            orientation={isSmallScreen ? 'vertical' : 'horizontal'}
            sx={{ marginBottom: '30px' }}
            value={choosenProcess}
          >
            {processTemplates?.map((processTemplate) => (
              <ToggleButton
                key={processTemplate.slug}
                sx={{
                  backgroundColor: 'background.paper',
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
        </Box>

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
    router.push(
      {
        pathname: router.asPath,
      },
      undefined,
      { scroll: false },
    );
  };

  const hasExpired = differenceInCalendarDays(new Date(employeeTask.dueDate), new Date()) < 0;

  return (
    <>
      {loading && <LinearProgress />}
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        disableGutters
        sx={{ marginBottom: '16px', borderRadius: '4px', backgroundColor: hasExpired ? 'error.dark' : 'background.paper' }}
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
                  <DateFormater date={employeeTask.dueDate} />
                  <Typography>{`${employeeTask.responsible.firstName} ${employeeTask.responsible.lastName}`}</Typography>
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
                <DateFormater date={employeeTask.dueDate} />
                <Avatar
                  firstName={employeeTask.responsible.firstName}
                  image={employeeTask.responsible.imageUrl}
                  lastName={employeeTask.responsible.lastName}
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
          {employeeTask.completedById && (
            <>
              <Typography variant='body2'>{`Fullført den ${prismaDateToFormatedDate(employeeTask.completedDate)}`}</Typography>
              <Typography gutterBottom variant='body2'>{`av ${employeeTask.completedBy.firstName} ${employeeTask.completedBy.lastName}`}</Typography>
            </>
          )}
          <Typography variant='body2'>{`Oppgaveansvarlig: ${employeeTask.responsible.firstName} ${employeeTask.responsible.lastName}`}</Typography>
          <Typography variant='body2'>{`Prosess: ${employeeTask.task.phase.processTemplate.title}`}</Typography>
          <Typography gutterBottom variant='body2'>{`Fase: ${employeeTask.task.phase.title}`}</Typography>
          <TextMarkDownWithLink text={employeeTask?.task.description} variant={'body2'} />
          <Comments employeeTask={employeeTask?.id} />
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

const EditResponsibleButton = ({ employeeTask }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Button
        aria-label='Åpne endre oppgaveansvarlig modal'
        disabled={employeeTask.completed}
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
