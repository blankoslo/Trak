import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchField from 'components/SearchField';
import Toggle from 'components/Toggle';
import EmployeeCard from 'components/views/employees/EmployeeCard';
import { trakClient } from 'lib/prisma';
import { capitalize } from 'lodash';
import uniqBy from 'lodash/uniqBy';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { MineAlleToggle } from 'pages/index';
import { useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query?.mine) {
    return {
      redirect: {
        permanent: false,
        destination: '/ansatt?mine=true',
      },
      props: {},
    };
  }

  const my = context.query?.mine === 'true';
  const search = context.query?.search;

  const session = await getSession(context);

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
                        employee: {
                          hrManagerId: parseInt(session?.user?.id) || null,
                        },
                      }),
                    },
                    {
                      ...(search && {
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
                      }),
                    },
                    {
                      completed: {
                        equals: false,
                      },
                    },
                  ],
                },
                orderBy: [
                  {
                    employee: {
                      firstName: 'asc',
                    },
                  },
                  {
                    employee: {
                      lastName: 'asc',
                    },
                  },
                ],
                select: {
                  employee: {
                    select: {
                      employeeTask: {
                        where: {
                          responsibleId: parseInt(session.user.id),
                        },
                        select: {
                          id: true,
                        },
                      },
                      id: true,
                      firstName: true,
                      lastName: true,
                      gender: true,
                      imageUrl: true,
                      profession: {
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
        result.push(el.employee);
      }
    });
  }
  const processTemplateWithEmployeeFlatten = processTemplateQuery.map((processTemplate) => {
    const tempEmployeeList = [];
    collect(processTemplate.phases, tempEmployeeList);
    return {
      ...processTemplate,
      employees: uniqBy(tempEmployeeList, 'id'),
    };
  });

  const processTemplates = JSON.parse(safeJsonStringify(processTemplateWithEmployeeFlatten));

  const selectedOption = my ? selectedOptionEnum.Mine : selectedOptionEnum.Alle;

  return { props: { processTemplates, selectedOption } };
};

export enum selectedOptionEnum {
  Mine,
  Alle,
}

const Employees: NextPage = ({ processTemplates, selectedOption }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [gridLayout] = useState({ offboarding: 12, onboarding: 12, lopende: 12 });
  const router = useRouter();

  const switchPage = () => {
    router.push({
      pathname: '/',
      query: { ...router.query, mine: selectedOption === selectedOptionEnum.Mine },
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '16px auto',
        width: { xs: '90%', sm: '90%', md: '50%' },
      }}
    >
      <Stack direction='row' spacing={2}>
        <Toggle defaultChecked={1} onToggle={switchPage} options={['Oppgaver', 'Ansatte']} />
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
      <Stack direction='column' spacing={1}>
        <Grid container rowSpacing={4}>
          {processTemplates.map((processTemplate) => {
            return (
              <Grid item key={processTemplate.title} sm={gridLayout[processTemplate.title]} xs={12}>
                <Typography variant='h3'>{capitalize(processTemplate.title)}</Typography>
                {!processTemplate.employees.length ? (
                  <Typography>Ingen ansatte i denne prosessen </Typography>
                ) : (
                  <Grid alignItems='center' container justifyContent='center' spacing={2}>
                    {processTemplate.employees.map((employee) => (
                      <Grid item key={employee.id} lg={4} sm={6} xs={12}>
                        <EmployeeCard
                          firstName={employee.firstName}
                          gender={employee.gender}
                          id={employee.id}
                          imageUrl={employee.imageUrl}
                          lastName={employee.lastName}
                          nrOfMyTasks={employee.employeeTask.length}
                          processTemplate={processTemplate.slug}
                          role={employee.profession.title}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
};
export default Employees;
