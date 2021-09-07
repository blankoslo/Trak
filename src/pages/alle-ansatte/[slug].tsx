import { Box } from '@material-ui/core';
import PageTitle from 'components/PageTitle';
import SearchFilter from 'components/SearchFilter';
import Filter from 'components/views/mine-ansatte/Filter';
import PhaseCard from 'components/views/mine-ansatte/PhaseCard';
import { trakClient } from 'lib/prisma';
import moment from 'moment';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import theme from 'theme';
import { IEmployee, IEmployeeTask, IPhase, IProcessTemplate, Process } from 'utils/types';
import { filterAndSearchEmployees } from 'utils/utils';

const TODAY = moment();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const phases = trakClient.processTemplate.findMany({
    where: {
      slug: params.slug.toString(),
    },
    select: {
      id: true,
      slug: true,
      title: true,
      phases: {
        orderBy: [
          {
            dueDate: 'asc',
          },
          {
            dueDateDayOffset: 'asc',
          },
        ],
        select: {
          id: true,
          title: true,
          dueDate: true,
          tasks: {
            select: {
              employeeTask: {
                include: {
                  employee: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      imageUrl: true,
                      profession: {
                        select: {
                          title: true,
                        },
                      },
                      hrManager: {
                        select: {
                          id: true,
                          firstName: true,
                          lastName: true,
                          imageUrl: true,
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

  const employees = trakClient.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      profession: {
        select: {
          title: true,
        },
      },
      hrManager: {
        select: {
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
      employeeTask: {
        where: {
          task: {
            phase: {
              processTemplate: {
                slug: params.slug.toString(),
              },
            },
          },
        },
        select: {
          completed: true,
          dueDate: true,
          task: {
            select: {
              phase: {
                select: {
                  id: true,
                  dueDate: true,
                  title: true,
                  processTemplate: {
                    select: {
                      slug: true,
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
  const data = await Promise.all([phases, employees]);

  const allPhases = JSON.parse(safeJsonStringify(data[0]));
  const myEmployees = JSON.parse(safeJsonStringify(data[1]));

  return { props: { allPhases, myEmployees } };
};
export const addFinishedTasks = (filteredEmployees: IEmployee[], phase: IPhase) => {
  filteredEmployees.forEach((employee: IEmployee) => {
    employee['tasksFinished'] = employee.employeeTask.filter(
      (employeeTask: IEmployeeTask) =>
        employeeTask.completed &&
        employeeTask.task.phase.title === phase.title &&
        (employeeTask.task.phase.processTemplate.slug === Process.LOPENDE ? new Date(employeeTask.dueDate).getFullYear() === TODAY.year() : true),
    ).length;

    employee['totalTasks'] = employee.employeeTask.filter(
      (employeeTask: IEmployeeTask) =>
        employeeTask.task.phase.title === phase.title &&
        (employeeTask.task.phase.processTemplate.slug === Process.LOPENDE ? new Date(employeeTask.dueDate).getFullYear() === TODAY.year() : true),
    ).length;
  });
};

export const getPhasesWithEmployees = (processTemplate: IProcessTemplate, myEmployees) => {
  const displayedEmployees = [];

  const currentPhase = processTemplate.phases.find((phase: IPhase) => {
    const dueDate = moment(phase.dueDate);
    if (dueDate.month() === TODAY.month()) {
      return dueDate.day() > TODAY.day();
    }

    return dueDate.month() > TODAY.month();
  });

  return [
    ...processTemplate.phases.map((phase: IPhase) => {
      const employeesWithUncompletedTasks = myEmployees.filter((employee: IEmployee) => {
        if (processTemplate.slug === Process.LOPENDE) {
          const tasksInPhase = employee.employeeTask.filter(
            (employeeTask: IEmployeeTask) => employeeTask.task.phase.title === phase.title && moment(employeeTask.dueDate).year() === TODAY.year(),
          );
          const phaseCompleted = tasksInPhase.every((employeeTask) => employeeTask.completed) && tasksInPhase.length;
          if (phaseCompleted && phase.id === currentPhase.id) {
            return employee;
          }
        }
        return employee.employeeTask.some((employeeTask: IEmployeeTask) => !employeeTask.completed && employeeTask.task.phase.title === phase.title);
      });
      const filteredEmployees = employeesWithUncompletedTasks.filter((employee: IEmployee) => {
        if (displayedEmployees.includes(employee.id)) {
          return false;
        } else {
          displayedEmployees.push(employee.id);
          return true;
        }
      });

      addFinishedTasks(filteredEmployees, phase);

      return { employees: filteredEmployees, title: phase.title, id: phase.id };
    }),
  ];
};

const MyEmployees = ({ myEmployees, allPhases }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const processTemplate = allPhases[0];
  const phases = getPhasesWithEmployees(processTemplate, myEmployees);
  const router = useRouter();

  const [searchString, setSearchString] = useState('');
  const [choosenProfession, setChoosenProfession] = useState<string[]>([]);

  useEffect(() => {
    setChoosenProfession([]);
  }, [router.query]);

  const filterResult = useMemo(() => {
    return filterAndSearchEmployees(searchString, { professions: choosenProfession }, phases, true);
  }, [searchString, choosenProfession]);
  return (
    <>
      <Head>
        <title>Alle ansatte - {processTemplate.title}</title>
      </Head>
      <PageTitle subtitle={processTemplate.title} title='Alle ansatte' />
      <SearchFilter
        activeFilters={Boolean(choosenProfession.length)}
        filterComponent={<Filter choosenProfession={choosenProfession} setChoosenProfession={setChoosenProfession} />}
        search={setSearchString}
      />
      {(filterResult.length ? filterResult : phases).map((phase) => {
        return (
          <Box key={phase.id} mb={theme.spacing(2)}>
            <PhaseCard amount={phase.employees.length} employees={phase.employees} id={phase.id} slug={processTemplate.slug} title={phase.title} />
          </Box>
        );
      })}
    </>
  );
};

export default MyEmployees;
