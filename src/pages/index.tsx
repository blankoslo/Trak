import Stack from '@mui/material/Stack';
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

  const processTemplateQuery = await trakClient.processTemplate.findMany({
    select: {
      slug: true,
      title: true,
      phases: {
        select: {
          tasks: {
            select: {
              employeeTask: {
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
                                  firstName: {
                                    mode: 'insensitive',
                                    contains: search.toString(),
                                  },
                                },
                                {
                                  lastName: {
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
                                  firstName: {
                                    mode: 'insensitive',
                                    contains: search.toString(),
                                  },
                                },
                                {
                                  lastName: {
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
                      dueDate: {
                        lte: threeMonthsFromNow,
                      },
                    },
                  ],
                },
                select: {
                  id: true,
                  dueDate: true,

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
      } else if (el.employeeTask) {
        collect(el.employeeTask, result);
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
      tasks: orderBy(tempEmployeeList, ['dueDate'], ['asc']),
    };
  });

  const processTemplates = JSON.parse(safeJsonStringify(processTemplateWithEmployeeFlattenAndOrdered));

  const selectedOption = my ? selectedOptionEnum.Mine : selectedOptionEnum.Alle;

  return { props: { processTemplates, selectedOption } };
};
const Tasks = ({ processTemplates, selectedOption }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
