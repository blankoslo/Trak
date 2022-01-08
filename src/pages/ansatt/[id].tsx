import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditDueDateModal from 'components/modals/EditDueDateModal';
import EditResponsibleModal from 'components/modals/EditResponsibleModal';
import useSnackbar from 'context/Snackbar';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { prismaDateToFormatedDate, toggleCheckBox } from 'utils/utils';

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

  const hasStarted = new Date(employee.dateOfEmployment) < new Date();
  return (
    <>
      <Head>
        <title>Ansatt</title>
      </Head>
      <Container maxWidth='md' sx={{ paddingTop: '30px' }}>
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
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const accordianBackgroundColor = 'rgba(255, 255, 255, 0.2)';

  const checkboxClicked = async (e) => {
    e.stopPropagation();
    await toggleCheckBox(employeeTask, completed, setCompleted, showSnackbar);

    router.push({
      pathname: router.asPath,
    });
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} disableGutters sx={{ marginBottom: '16px', borderRadius: '4px' }}>
      <AccordionSummary aria-controls='TASK1_RENAME_ME_PLEASE' expandIcon={<ExpandMore />} id='TASK1_RENAME_ME_PLEASE'>
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
            <Box>
              <Typography>{employeeTask.task.title}</Typography>
              <Typography>{prismaDateToFormatedDate(employeeTask.dueDate)}</Typography>
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
            </Box>
            <Typography>{prismaDateToFormatedDate(employeeTask.dueDate)}</Typography>
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
        {employeeTask.task.link && (
          <Typography variant='body2'>
            {`Ekstern link: `}
            <Link href={employeeTask.task.link} rel='noopener' target='_blank' underline='hover'>
              her
            </Link>
          </Typography>
        )}
        <Typography variant='body2'>{`Prosess: ${employeeTask.task.phase.processTemplate.title}`}</Typography>
        <Typography gutterBottom variant='body2'>{`Fase: ${employeeTask.task.phase.title}`}</Typography>
        <Typography variant='body2'>{employeeTask.task.description}</Typography>
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
  );
};

const EditResponsibleButton = ({ employeeTask }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Button
        aria-label='Åpne endre oppgaveansvarlig modal'
        onClick={() => setIsModalOpen(true)}
        sx={{ textTransform: 'capitalize' }}
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
        onClick={() => setIsModalOpen(true)}
        sx={{ textTransform: 'capitalize' }}
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
