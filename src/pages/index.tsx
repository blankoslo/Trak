import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SearchField from 'components/SearchField';
import Toggle from 'components/Toggle';
import Process from 'components/views/oppgaver/Process';
import addMonths from 'date-fns/addMonths';
import { trakClient } from 'lib/prisma';
import { filter, sortBy } from 'lodash';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { selectedOptionEnum } from 'pages/ansatt';
import { useState } from 'react';
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
  if (!context.query?.mine) {
    return {
      redirect: {
        permanent: false,
        destination: '/?mine=true',
      },
      props: {},
    };
  }

  const my = Boolean(context.query?.mine === 'true');
  const session = await getSession(context);

  const processes = await trakClient.processTemplate.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
  const threeMonthsFromNow = addMonths(new Date(), 3);
  const initialProcessTemplates = processes.map((processTemplate) => {
    return {
      ...processTemplate,
      tasks: [],
    };
  });

  const query = await trakClient.employeeTask.findMany({
    where: {
      ...(my && {
        responsible: {
          email: session?.user?.email,
        },
      }),
      completed: {
        equals: false,
      },
      dueDate: {
        lte: threeMonthsFromNow,
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
          link: true,
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

  const selectedOption = my ? selectedOptionEnum.Mine : selectedOptionEnum.Alle;

  return { props: { processTemplates, selectedOption } };
};
const Tasks = ({ processTemplates, selectedOption }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const switchPage = () => {
    router.push({
      pathname: '/ansatt',
      query: { mine: selectedOption === selectedOptionEnum.Mine },
    });
  };

  return (
    <>
      <Head>
        <title>Mine oppgaver</title>
      </Head>
      <Stack className={classes.root} spacing={2}>
        <Stack direction={'row'} spacing={1}>
          <Toggle defaultChecked={0} onToggle={switchPage} options={['Oppgaver', 'Ansatte']} />
          <MineAlleToggle selectedOption={selectedOption} />
        </Stack>
        <SearchField onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Søk etter tittel, ansatt...' />
        <Stack spacing={1} sx={{ width: '100%' }}>
          {processTemplates
            .map((processTemplate) => {
              if (!search) {
                return processTemplate;
              }
              return {
                ...processTemplate,
                tasks: filter(processTemplate.tasks, (task) => {
                  return (
                    task.task.title.toLowerCase().indexOf(search) > -1 ||
                    task.employee.firstName.toLowerCase().indexOf(search) > -1 ||
                    task.employee.lastName.toLowerCase().indexOf(search) > -1 ||
                    (selectedOption === selectedOptionEnum.Alle && task.responsible.firstName.toLowerCase().indexOf(search) > -1) ||
                    (selectedOption === selectedOptionEnum.Alle && task.responsible.lastName.toLowerCase().indexOf(search) > -1)
                  );
                }),
              };
            })
            .map((processTemplate) => (
              <Process
                displayResponsible={selectedOption === selectedOptionEnum.Alle}
                key={processTemplate.title}
                tasks={processTemplate.tasks}
                title={processTemplate.title}
              />
            ))}
        </Stack>
      </Stack>
    </>
  );
};

export const MineAlleToggle = ({ selectedOption }) => {
  const router = useRouter();

  const toogleOption = () => {
    if (selectedOption === selectedOptionEnum.Mine) {
      router.push({
        pathname: router.pathname,
        query: { mine: false },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: { mine: true },
      });
    }
  };

  return <Toggle defaultChecked={Number(selectedOption !== selectedOptionEnum.Mine)} onToggle={toogleOption} options={['Mine', 'Alle']} />;
};
export default Tasks;
