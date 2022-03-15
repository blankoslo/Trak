import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from 'components/Avatar';
import Comments from 'components/Comments';
import Markdown from 'components/Markdown';
import useSnackbar from 'context/Snackbar';
import format from 'date-fns/format';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EditResponsibleButton } from 'pages/ansatt/[id]';
import { PersonaliaText } from 'pages/innstillinger';
import safeJsonStringify from 'safe-json-stringify';
import { IEmployeeTask } from 'utils/types';
import { toggleCheckBox } from 'utils/utils';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const task_query = await trakClient.employeeTask.findUnique({
    where: {
      id: context.query.task_id.toString(),
    },
    select: {
      id: true,
      completed: true,
      dueDate: true,
      completedBy: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      completedDate: true,
      comments: {
        include: {
          createdByEmployee: true,
        },
      },
      employee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
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
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          phase: {
            select: {
              id: true,
              title: true,
              processTemplate: {
                select: {
                  slug: true,
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const task = JSON.parse(safeJsonStringify(task_query));

  return { props: { task } };
};

const TaskPage = ({ task }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>
          {task.task.title} - {task.employee.firstName} {task.employee.lastName}
        </title>
      </Head>
      <Container maxWidth='md' sx={{ paddingTop: { xs: 2, md: 7 }, paddingBottom: 8 }}>
        <Stack
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-evenly'
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Stack direction='column' spacing={2} sx={{ width: { xs: '100%', md: '100%' } }}>
            <TaskCard employeeTask={task} />
            <TaskCommentCard employeeTask={task} />
          </Stack>
          <Stack direction='column' spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
              <PersonaliaPaper employee={task.employee} title='Gjelder' />
              <PersonaliaPaper employee={task.responsible} title='Ansvarlig' />
            </Stack>
            <ActionCard employeeTask={task} />
            {task.completed && <CompletedCard employeeTask={task} />}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

const PersonaliaPaper = ({ employee, title }) => {
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'fit-content' } }}>
      <Stack alignItems='center' direction='column' spacing={1}>
        <Typography variant='h3'>{title}</Typography>
        <Stack alignItems='center' direction='column' spacing={1}>
          <Avatar firstName={employee.firstName} image={employee.imageUrl} lastName={employee.lastName} sx={{ width: 80, height: 80 }} />
          <Stack alignItems='flex-start' direction='column' spacing={0.5}>
            <PersonaliaText smallText={''} text={`${employee.firstName} ${employee.lastName}`} />
            <PersonaliaText smallText={''} text={employee.email} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

const TaskCard = ({ employeeTask }: { employeeTask: IEmployeeTask }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Typography variant='h2'>{employeeTask.task.title}</Typography>
        <PersonaliaText smallText={''} text={`${employeeTask.task.phase.processTemplate.title} / ${employeeTask.task.phase.title}`} />
        <PersonaliaText smallText={'forfallsdato'} text={`${format(new Date(employeeTask.dueDate), 'dd MMM yyyy')}`} />
        {employeeTask.task.link && (
          <PersonaliaText
            smallText={'ekstern link'}
            text={
              <a href={employeeTask.task.link} style={{ color: theme.palette.primary.main }}>
                {employeeTask.task.link}
              </a>
            }
          />
        )}
        <Markdown text={employeeTask.task.description} />
      </Stack>
    </Paper>
  );
};

const CompletedCard = ({ employeeTask }: { employeeTask: IEmployeeTask }) => {
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Typography variant='h2'>Fullført</Typography>
        <PersonaliaText smallText={'av'} text={`${employeeTask.completedBy.firstName} ${employeeTask.completedBy.lastName}`} />
        <PersonaliaText smallText={'når'} text={`${format(new Date(employeeTask.completedDate), 'dd MMM yyyy, HH:mm')} `} />
      </Stack>
    </Paper>
  );
};
const TaskCommentCard = ({ employeeTask }: { employeeTask: IEmployeeTask }) => {
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Typography variant='h2'>Kommentarer</Typography>

      <Comments employeeTask={employeeTask} />
    </Paper>
  );
};

const ActionCard = ({ employeeTask }: { employeeTask: IEmployeeTask }) => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Button
          color={employeeTask.completed ? 'error' : 'success'}
          fullWidth
          onClick={() =>
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            toggleCheckBox(employeeTask, employeeTask.completed, () => {}, showSnackbar).then(() =>
              router.push({
                pathname: router.asPath,
              }),
            )
          }
          startIcon={employeeTask.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          variant='contained'
        >
          {employeeTask.completed ? 'Ikke fullfør oppgave' : 'Fullfør oppgave'}
        </Button>
        <EditResponsibleButton employeeTask={employeeTask} fullWidth={true} />
        <Link href={`/ansatt/${employeeTask.employee.id}?process=${employeeTask.task.phase.processTemplate.slug}`} passHref>
          <Button fullWidth variant='text'>
            Til ansattside
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default TaskPage;
