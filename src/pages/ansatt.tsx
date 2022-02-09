import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import SearchField from 'components/SearchField';
import Toggle from 'components/Toggle';
import EmployeeCard from 'components/views/employees/EmployeeCard';
import { trakClient } from 'lib/prisma';
import { capitalize, filter } from 'lodash';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { MineAlleToggle } from 'pages/index';
import { useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: `${theme.spacing(4)} auto`,
    width: '50%',
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
        destination: '/ansatt?mine=true',
      },
      props: {},
    };
  }

  const my = context.query?.mine === 'true';
  const session = await getSession(context);

  const processes = await trakClient.processTemplate.findMany({
    select: {
      slug: true,
      title: true,
    },
  });

  const processTemplates = processes.map((processTemplate) => {
    return {
      ...processTemplate,
      employees: [],
    };
  });
  const employeesQuery = await trakClient.employee.findMany({
    where: {
      ...(my && {
        hrManagerId: parseInt(session?.user?.id) || null,
      }),
    },
    orderBy: [
      {
        firstName: 'asc',
      },
      {
        lastName: 'asc',
      },
    ],
    include: {
      profession: {
        select: {
          title: true,
        },
      },
      employeeTask: {
        where: {
          completed: false,
        },

        select: {
          task: {
            select: {
              phase: {
                select: {
                  processTemplateId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const employees = JSON.parse(safeJsonStringify(employeesQuery));
  employees.forEach((employee) => {
    const employeeProcesses = [...new Set(employee.employeeTask.flatMap(({ task }) => task.phase.processTemplateId))];
    employeeProcesses.forEach((employeeProcess) => {
      const index = processTemplates.findIndex((pt) => pt.slug === employeeProcess);
      processTemplates[index].employees.push(employee);
    });
  });
  const selectedOption = my ? selectedOptionEnum.Mine : selectedOptionEnum.Alle;

  return { props: { processTemplates, selectedOption } };
};

export enum selectedOptionEnum {
  Mine,
  Alle,
}

const Employees: NextPage = ({ processTemplates, selectedOption }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [gridLayout] = useState({ offboarding: 12, onboarding: 12, lopende: 12 });

  const router = useRouter();

  const switchPage = () => {
    router.push({
      pathname: '/',
      query: { mine: selectedOption === selectedOptionEnum.Mine },
    });
  };

  return (
    <Stack className={classes.root} spacing={2}>
      <Stack direction='row' spacing={2}>
        <Toggle defaultChecked={1} onToggle={switchPage} options={['Oppgaver', 'Ansatte']} />
        <MineAlleToggle selectedOption={selectedOption} />
      </Stack>
      <SearchField onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Søk etter tittel, ansatt...' />
      <Stack direction='column' spacing={1}>
        <Grid container rowSpacing={4}>
          {processTemplates
            .map((processTemplate) => {
              if (!search) {
                return processTemplate;
              }
              return {
                ...processTemplate,
                employees: filter(processTemplate.employees, (employee) => {
                  return employee.firstName.toLowerCase().indexOf(search) > -1 || employee.lastName.toLowerCase().indexOf(search) > -1;
                }),
              };
            })
            .map((processTemplate) => {
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
