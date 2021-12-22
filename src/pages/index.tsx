import { Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import LoadingLogo from 'components/LoadingLogo';
import Toggle from 'components/Toggle';
import EmployeeCard from 'components/views/employees/EmployeeCard';
import { trakClient } from 'lib/prisma';
import { capitalize } from 'lodash';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

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
  const session = await getSession(context);

  const processTemplates = await trakClient.processTemplate.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
  processTemplates.map((processTemplate) => (processTemplate['employees'] = []));

  const employeesQuery = await trakClient.employee.findMany({
    where: {
      hrManagerId: parseInt(session?.user?.id) || null,
    },
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

  // const employees = JSON.parse(safeJsonStringify(employeesQuery));
  employeesQuery.forEach((employee) => {
    const employeeProcesses = [...new Set(employee.employeeTask.flatMap(({ task }) => task.phase.processTemplateId))];
    employeeProcesses.forEach((employeeProcess) => {
      const index = processTemplates.findIndex((pt) => pt.slug === employeeProcess);
      processTemplates[index].employees.push(employee);
    });
  });

  return { props: { processTemplates } };
};

enum selectedOptionEnum {
  Mine,
  Alle,
}

const Employees: NextPage = ({ processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(selectedOptionEnum.Mine);
  const [allEmployees, setAllEmployees] = useState([]);
  const [gridLayout] = useState({ offboarding: 12, onboarding: 12, lopende: 12 });
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const toogleOption = () => {
    if (selectedOption === selectedOptionEnum.Mine) {
      setSelectedOption(selectedOptionEnum.Alle);
    } else {
      setSelectedOption(selectedOptionEnum.Mine);
    }
  };
  useEffect(() => {
    if (!allEmployees.length && selectedOption === selectedOptionEnum.Alle) {
      axios
        .get('/api/employees')
        .then((res) => {
          setAllEmployees(res.data);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        });
    }
  }, [selectedOption]);

  return (
    <main className={classes.root}>
      <Stack direction='row' spacing={2}>
        {!isSmallScreen && <Toggle onToggle={() => null} options={['Ansatte', 'Oppgaver']} />}
        <Toggle onToggle={toogleOption} options={['Mine', 'Alle']} />
      </Stack>

      {!allEmployees.length && selectedOption === selectedOptionEnum.Alle && <LoadingLogo />}
      <Stack direction='column' spacing={1}>
        <Grid container rowSpacing={4}>
          {(selectedOption === selectedOptionEnum.Mine ? processTemplates : allEmployees).map((processTemplate) => {
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
    </main>
  );
};
export default Employees;
