import Stack from '@mui/material/Stack';
import Notifier from 'components/Notifier';
import SearchField from 'components/SearchField';
import Toggle from 'components/Toggle';
import Process from 'components/views/oppgaver/Process';
import addMonths from 'date-fns/addMonths';
import { trakClient } from 'lib/prisma';
import orderBy from 'lodash/orderBy';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { selectedOptionEnum } from 'pages/ansatt';
import safeJsonStringify from 'safe-json-stringify';
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

  const my = context.query?.mine === 'true';
  const search = context.query?.search;

  const session = await getSession(context);
  const threeMonthsFromNow = addMonths(new Date(), 3);

  const processTemplateQuery = await trakClient.process_template.findMany({
    select: {
      slug: true,
      title: true,
      phases: {
        select: {
          tasks: {
            select: {
              employee_task: {
                where: {
                  AND: [
                    {
                      ...(my && {
                        responsible: {
                          email: session?.user?.email,
                        },
                      }),
                    },
                    {
                      ...(search && {
                        OR: [
                          {
                            task: {
                              title: {
                                mode: 'insensitive',
                                contains: search.toString(),
                              },
                            },
                          },
                          {
                            employee: {
                              OR: [
                                {
                                  first_name: {
                                    mode: 'insensitive',
                                    contains: search.toString(),
                                  },
                                },
                                {
                                  last_name: {
                                    mode: 'insensitive',
                                    contains: search.toString(),
                                  },
                                },
                              ],
                            },
                          },
                          {
                            responsible: {
                              OR: [
                                {
                                  first_name: {
                                    mode: 'insensitive',
                                    contains: search.toString(),
                                  },
                                },
                                {
                                  last_name: {
                                    mode: 'insensitive',
                                    contains: search.toString(),
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      }),
                    },
                    {
                      completed: {
                        equals: false,
                      },
                    },
                    {
                      due_date: {
                        lte: threeMonthsFromNow,
                      },
                    },
                  ],
                },
                select: {
                  id: true,
                  due_date: true,
                  responsible_id: true,
                  responsible: {
                    select: {
                      first_name: true,
                      last_name: true,
                      image_url: true,
                      id: true,
                    },
                  },
                  employee: {
                    select: {
                      image_url: true,
                      id: true,
                      first_name: true,
                      last_name: true,
                    },
                  },
                  task: {
                    select: {
                      title: true,
                      link: true,
                      phase: {
                        select: {
                          process_template_id: true,
                          process_template: {
                            select: {
                              title: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  function collect(array, result) {
    array.forEach(function (el) {
      if (el.phases) {
        collect(el.phases, result);
      } else if (el.tasks) {
        collect(el.tasks, result);
      } else if (el.employee_task) {
        collect(el.employee_task, result);
      } else {
        result.push(el);
      }
    });
  }
  const processTemplateWithEmployeeFlattenAndOrdered = processTemplateQuery.map((processTemplate) => {
    const tempEmployeeList = [];
    collect(processTemplate.phases, tempEmployeeList);
    return {
      ...processTemplate,
      tasks: orderBy(tempEmployeeList, ['due_date', 'employee.first_name', 'employee.last_name'], ['asc', 'asc', 'asc']),
    };
  });

  const processTemplates = JSON.parse(safeJsonStringify(processTemplateWithEmployeeFlattenAndOrdered));

  const selectedOption = my ? selectedOptionEnum.Mine : selectedOptionEnum.Alle;

  const employeesWithoutHrManagerQuery = await trakClient.employees.findMany({
    where: {
      hr_manager: null,
      termination_date: null,
    },
    select: {
      first_name: true,
      last_name: true,
    },
  });

  const employeesWithoutHrManager = employeesWithoutHrManagerQuery.map((employee) => `- ${employee.first_name} ${employee.last_name}`);
  const employeesWithoutHrManagerList = employeesWithoutHrManager.join('\n');
  const employeesWithoutHrManagerLength = employeesWithoutHrManager.length;
  return { props: { processTemplates, selectedOption, employeesWithoutHrManagerLength, employeesWithoutHrManagerList } };
};
const Tasks = ({
  processTemplates,
  selectedOption,
  employeesWithoutHrManagerLength,
  employeesWithoutHrManagerList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const switchPage = () => {
    router.push({
      pathname: '/ansatt',
      query: { ...router.query, mine: selectedOption === selectedOptionEnum.Mine },
    });
  };

  return (
    <>
      <Head>
        <title>Mine oppgaver</title>
      </Head>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '16px auto',
          width: { xs: '90%', sm: '90%', md: '80%' },
        }}
      >
        <Stack direction={'row'} spacing={1}>
          <Toggle defaultChecked={0} onToggle={switchPage} options={['Oppgaver', 'Ansatte']} />
          <MineAlleToggle selectedOption={selectedOption} />
        </Stack>
        {employeesWithoutHrManagerLength > 0 && (
          <Notifier expandedMessage={employeesWithoutHrManagerList} header={`${employeesWithoutHrManagerLength} ansatte mangler personalansvarlig`} />
        )}
        <SearchField
          defaultValue={router.query.search}
          onChange={(e) => {
            router.push({
              pathname: router.pathname,
              query: { ...router.query, search: e.target.value.toLowerCase() },
            });
          }}
          placeholder='Søk etter tittel, ansatt...'
        />
        <Stack spacing={1} sx={{ width: '100%' }}>
          {processTemplates.map((processTemplate) => (
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
    router.push({
      pathname: router.pathname,
      query: { ...router.query, mine: !(selectedOption === selectedOptionEnum.Mine) },
    });
  };

  return <Toggle defaultChecked={Number(selectedOption !== selectedOptionEnum.Mine)} onToggle={toogleOption} options={['Mine', 'Alle']} />;
};
export default Tasks;
