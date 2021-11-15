import { Grid, Stack, Theme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import LoadingLogo from 'components/LoadingLogo';
import Toggle from 'components/Toggle';
import Typo from 'components/Typo';
import EmployeeCard from 'components/views/ny/ansatte/EmployeeCard';
import { trakClient } from 'lib/prisma';
import { capitalize } from 'lodash';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
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
  const session = await getSession(context);

  const processTemplates = [
    { title: 'offboarding', employees: [] },
    { title: 'onboarding', employees: [] },
    { title: 'lopende', employees: [] },
  ];
  const employeesQuery = await trakClient.employee.findMany({
    where: {
      hrManagerId: parseInt(session?.user?.id),
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

  const employees = JSON.parse(safeJsonStringify(employeesQuery));
  employees.forEach((employee) => {
    employee.employeeTask.forEach((task) => {
      const processTemplate = task.task.phase.processTemplateId;
      const index = processTemplates.findIndex((pt) => pt.title === processTemplate);
      if (processTemplates[index].employees.filter((emp) => emp.id === employee.id).length === 0) {
        processTemplates[index].employees.push(employee);
      }
    });
  });

  return { props: { processTemplates } };
};

const Employees = ({ processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(0);
  const [allEmployees, setAllEmployees] = useState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const [gridLayout] = useState({ offboarding: 12, onboarding: 12, lopende: 12 });
  const [isLoading, setIsLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const toogleOption = () => {
    if (selectedOption === 0) {
      setSelectedOption(1);
    } else {
      setSelectedOption(0);
    }
  };
  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
    } else if (allEmployees.length === 0) {
      setIsLoading(true);
      axios
        .get('/api/allEmployees')
        .then((res) => {
          setAllEmployees(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        });
    }
  }, [selectedOption]);

  if (selectedOption === 0 && !processTemplates) {
    return <LoadingLogo />;
  }
  if (selectedOption === 1 && !allEmployees) {
    return <LoadingLogo />;
  }
  return (
    <main className={classes.root}>
      <Stack direction='row' spacing={2}>
        {!isSmallScreen && <Toggle onToggle={() => null} options={['Ansatte', 'Oppgaver']} />}
        <Toggle onToggle={toogleOption} options={['Mine', 'Alle']} />
      </Stack>
      {isLoading && <LoadingLogo />}
      <Stack direction='column' spacing={1}>
        <Grid container rowSpacing={4}>
          {(selectedOption === 0 ? processTemplates : allEmployees).map((processTemplate) => {
            return (
              <Grid item key={processTemplate.title} sm={gridLayout[processTemplate.title]} xs={12}>
                <Typo variant='h3'>{capitalize(processTemplate.title)}</Typo>
                {!processTemplate.employees.length ? (
                  <Typo variant='body1'>Ingen ansatte i denne prosessen </Typo>
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
