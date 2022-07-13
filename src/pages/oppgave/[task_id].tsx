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
  const task_query = await trakClient.employee_task.findUnique({
    where: {
      id: context.query.task_id.toString(),
    },
    select: {
      id: true,
      completed: true,
      due_date: true,
      completed_by: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      completed_date: true,
      comments: {
        include: {
          created_by: true,
        },
      },
      employee: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          image_url: true,
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
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          phase: {
            select: {
              id: true,
              title: true,
              process_template: {
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
          {task.task.title} - {task.employee.first_name} {task.employee.last_name}
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
            <TaskCard employee_task={task} />
            <TaskCommentCard employee_task={task} />
          </Stack>
          <Stack direction='column' spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
              <PersonaliaPaper employee={task.employee} title='Gjelder' />
              <PersonaliaPaper employee={task.responsible} title='Ansvarlig' />
            </Stack>
            <ActionCard employee_task={task} />
            {task.completed && <CompletedCard employee_task={task} />}
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
          <Avatar firstName={employee.first_name} image={employee.image_url} lastName={employee.last_name} sx={{ width: 80, height: 80 }} />
          <Stack alignItems='flex-start' direction='column' spacing={0.5}>
            <PersonaliaText smallText={''} text={`${employee.first_name} ${employee.last_name}`} />
            <PersonaliaText smallText={''} text={employee.email} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

const TaskCard = ({ employee_task }: { employee_task: IEmployeeTask }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Typography variant='h2'>{employee_task.task.title}</Typography>
        <PersonaliaText smallText={''} text={`${employee_task.task.phase.process_template.title} / ${employee_task.task.phase.title}`} />
        <PersonaliaText smallText={'forfallsdato'} text={`${format(new Date(employee_task.due_date), 'dd MMM yyyy')}`} />
        {employee_task.task.link && (
          <a href={employee_task.task.link} style={{ color: theme.palette.primary.main }}>
            <PersonaliaText smallText={'ekstern link'} text={employee_task.task.link} />
          </a>
        )}
        <Markdown text={employee_task.task.description} />
      </Stack>
    </Paper>
  );
};

const CompletedCard = ({ employee_task }: { employee_task: IEmployeeTask }) => {
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Typography variant='h2'>Fullført</Typography>
        <PersonaliaText smallText={'av'} text={`${employee_task.completed_by.first_name} ${employee_task.completed_by.last_name}`} />
        <PersonaliaText smallText={'når'} text={`${format(new Date(employee_task.completed_date), 'dd MMM yyyy, HH:mm')} `} />
      </Stack>
    </Paper>
  );
};
const TaskCommentCard = ({ employee_task }: { employee_task: IEmployeeTask }) => {
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Typography variant='h2'>Kommentarer</Typography>

      <Comments employeeTask={employee_task} />
    </Paper>
  );
};

const ActionCard = ({ employee_task }: { employee_task: IEmployeeTask }) => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'auto' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Button
          color={employee_task.completed ? 'error' : 'success'}
          fullWidth
          onClick={() =>
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            toggleCheckBox(employee_task, employee_task.completed, () => {}, showSnackbar).then(() =>
              router.push({
                pathname: router.asPath,
              }),
            )
          }
          startIcon={employee_task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          variant='contained'
        >
          {employee_task.completed ? 'Ikke fullfør oppgave' : 'Fullfør oppgave'}
        </Button>
        <EditResponsibleButton employeeTask={employee_task} fullWidth={true} />
        <Link href={`/ansatt/${employee_task.employee.id}?process=${employee_task.task.phase.process_template.slug}`} passHref>
          <Button fullWidth variant='text'>
            Til ansattside
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default TaskPage;
