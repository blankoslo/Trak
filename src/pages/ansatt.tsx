import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import LoadingLogo from 'components/LoadingLogo';
import SearchField from 'components/SearchField';
import Toggle from 'components/Toggle';
import EmployeeCard from 'components/views/employees/EmployeeCard';
import { trakClient } from 'lib/prisma';
import { capitalize, filter } from 'lodash';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
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
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  // eslint-disable-next-line
  const processTemplates: any = await trakClient.processTemplate.findMany({
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

  const employees = JSON.parse(safeJsonStringify(employeesQuery));
  employees.forEach((employee) => {
    const employeeProcesses = [...new Set(employee.employeeTask.flatMap(({ task }) => task.phase.processTemplateId))];
    employeeProcesses.forEach((employeeProcess) => {
      const index = processTemplates.findIndex((pt) => pt.slug === employeeProcess);
      processTemplates[index].employees.push(employee);
    });
  });

  return { props: { processTemplates } };
};

export enum selectedOptionEnum {
  Mine,
  Alle,
}

const Employees: NextPage = ({ processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(selectedOptionEnum.Mine);
  const [allEmployees, setAllEmployees] = useState([]);
  const [gridLayout] = useState({ offboarding: 12, onboarding: 12, lopende: 12 });

  const router = useRouter();
  const toogleOption = () => {
    if (selectedOption === selectedOptionEnum.Mine) {
      setSelectedOption(selectedOptionEnum.Alle);
    } else {
      setSelectedOption(selectedOptionEnum.Mine);
    }
  };

  useEffect(() => {
    if (search) {
      const res = (selectedOption === selectedOptionEnum.Mine ? processTemplates : allEmployees).map((processTemplate) => {
        return {
          ...processTemplate,
          employees: filter(processTemplate.employees, (employee) => {
            return employee.firstName.toLowerCase().indexOf(search) > -1 || employee.lastName.toLowerCase().indexOf(search) > -1;
          }),
        };
      });
      setFilteredData(res);
    } else {
      setFilteredData([]);
    }
  }, [search]);
  useEffect(() => {
    if (!allEmployees.length && selectedOption === selectedOptionEnum.Alle) {
      axios
        .get('/api/allEmployees')
        .then((res) => {
          setAllEmployees(res.data);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        });
    }
  }, [selectedOption]);

  const switchPage = () => {
    router.push('/');
  };

  return (
    <Stack className={classes.root} spacing={2}>
      <Stack direction='row' spacing={2}>
        <Toggle defaultChecked={1} onToggle={switchPage} options={['Oppgaver', 'Ansatte']} />
        <Toggle onToggle={toogleOption} options={['Mine', 'Alle']} />
      </Stack>
      <SearchField onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Søk etter tittel, ansatt...' />
      {!allEmployees.length && selectedOption === selectedOptionEnum.Alle && <LoadingLogo />}
      <Stack direction='column' spacing={1}>
        <Grid container rowSpacing={4}>
          {(filteredData.length > 0 ? filteredData : selectedOption === selectedOptionEnum.Mine ? processTemplates : allEmployees).map((processTemplate) => {
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
    </Stack>
  );
};
export default Employees;
