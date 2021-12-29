import { Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchField from 'components/SearchField';
import Toggle from 'components/Toggle';
import Process from 'components/views/oppgaver/Process';
import { trakClient } from 'lib/prisma';
import { filter, sortBy } from 'lodash';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: `${theme.spacing(4)} auto`,
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const initialProcessTemplates = [
    { title: 'Offboarding', tasks: [] },
    { title: 'Onboarding', tasks: [] },
    { title: 'Løpende', tasks: [] },
  ];
  const query = await trakClient.employeeTask.findMany({
    where: {
      responsible: {
        email: session?.user?.email,
      },
      completed: {
        equals: false,
      },
    },

    orderBy: [
      {
        dueDate: 'asc',
      },
    ],
    include: {
      responsible: {
        select: {
          firstName: true,
          lastName: true,
          imageUrl: true,
          id: true,
        },
      },
      employee: {
        select: {
          imageUrl: true,
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      task: {
        select: {
          title: true,
          phase: {
            select: {
              processTemplateId: true,
              processTemplate: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const tasks = JSON.parse(safeJsonStringify(query));
  tasks.forEach((employeeTask) => {
    const processTemplate = employeeTask.task.phase.processTemplate.title;
    const index = initialProcessTemplates.findIndex((pt) => pt.title === processTemplate);
    initialProcessTemplates[index].tasks.push(employeeTask);
  });
  const processTemplates = initialProcessTemplates.map((processTemplate) => {
    return { ...processTemplate, tasks: sortBy(processTemplate.tasks, ['dueDate', 'employee.firstName', 'employee.lastName']) };
  });

  return { props: { processTemplates } };
};
const Tasks = ({ processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const switchPage = () => {
    router.push('/ansatt');
  };

  useEffect(() => {
    if (search) {
      const res = processTemplates.map((processTemplate) => {
        return {
          ...processTemplate,
          tasks: filter(processTemplate.tasks, (task) => {
            return (
              task.task.title.toLowerCase().indexOf(search) > -1 ||
              task.employee.firstName.toLowerCase().indexOf(search) > -1 ||
              task.employee.lastName.toLowerCase().indexOf(search) > -1
            );
          }),
        };
      });
      setFilteredData(res);
    } else {
      setFilteredData([]);
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Mine oppgaver</title>
      </Head>
      <Stack className={classes.root} spacing={2}>
        <Stack direction={'row'} spacing={1}>
          <Toggle defaultChecked={1} onToggle={switchPage} options={['Ansatte', 'Oppgaver']} />
          <Toggle onToggle={() => null} options={['Mine', 'Alle']} />
        </Stack>
        <SearchField onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Søk etter tittel, ansatt...' />
        <Stack spacing={1} sx={{ width: '100%' }}>
          {(filteredData.length > 0 ? filteredData : processTemplates).map((processTemplate) => (
            <Process key={processTemplate.title} tasks={processTemplate.tasks} title={processTemplate.title} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Tasks;
