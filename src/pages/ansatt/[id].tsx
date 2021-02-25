import { Box, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Typo from 'components/Typo';
import Phase from 'components/views/ansatt/Phase';
import prisma from 'lib/prisma';
import { flattenDeep, uniq, uniqBy } from 'lodash';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createContext, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import theme from 'theme';
import { IEmployeeTask, ITask } from 'utils/types';

export const EmployeeContext = createContext(undefined);

const useStyles = makeStyles({
  root: {
    marginLeft: '30px',
    marginTop: '60px',
    marginRight: '30px',
  },
  spaceRight: {
    marginRight: theme.spacing(4),
  },
});

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, år: year, prosess: process } = query;
  const parsedId = typeof id === 'string' && parseInt(id);
  if (!id || !process || !year) {
    return {
      notFound: true,
    };
  }
  const employeeQuery = await prisma.employee.findUnique({
    where: {
      id: parsedId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      hrManager: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      employeeTask: {
        where: {
          year: new Date(year.toString()),
          task: {
            phase: {
              processTemplate: {
                slug: process.toString(),
              },
            },
          },
        },
        select: {
          dueDate: true,
          completed: true,
          year: true,
          responsible: {
            select: {
              firstName: true,
              lastName: true,
              imageUrl: true,
              id: true,
            },
          },
          task: {
            select: {
              title: true,
              tags: true,
              description: true,
              phase: {
                select: {
                  title: true,
                  processTemplate: {
                    select: {
                      title: true,
                      slug: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          task: {
            phase: {
              createdAt: 'asc',
            },
          },
        },
      },
    },
  });

  const processesQuery = await prisma.processTemplate.findMany({
    select: {
      title: true,
      slug: true,
      phases: {
        select: {
          tasks: {
            select: {
              employeeTask: {
                where: {
                  employeeId: parsedId,
                },
                select: {
                  year: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!employeeQuery) {
    return {
      notFound: true,
    };
  }
  const employee = JSON.parse(safeJsonStringify(employeeQuery));
  const processes = JSON.parse(safeJsonStringify(processesQuery));
  const phases = uniq(
    employee.employeeTask.map((element) => {
      return element.task.phase.title;
    }),
  );

  const phasesWithTasks = phases.map((unique: string) => {
    const tasks = employee.employeeTask.filter((task: IEmployeeTask) => task.task.phase.title === unique);

    const finishedTasks = tasks.filter((task: IEmployeeTask) => task.completed);
    return {
      title: unique,
      tasks: tasks,
      totalTasks: tasks.length,
      finishedTasks: finishedTasks.length,
    };
  });

  const allTasks = processes.map((process) => {
    const years = process.phases.map((phase) => {
      return phase.tasks.map((task: ITask) => {
        return task.employeeTask.filter((employeeTask) => Boolean(employeeTask.year));
      });
    });
    const filteredYears = years.map((year) => {
      return year.filter((element) => {
        return element.length !== 0;
      });
    });
    return { title: process.title, slug: process.slug, years: filteredYears };
  });

  const history = allTasks.map((process) => {
    const years = flattenDeep(process.years);
    const uniqeYears = uniqBy(years, 'year');
    return { title: process.title, slug: process.slug, years: uniqeYears };
  });

  return { props: { employee, phasesWithTasks, year, process, history } };
};

const Employee = ({ employee, phasesWithTasks, year, process, history }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Head>
        <title>Ansatt</title>
      </Head>
      <div className={classes.root}>
        <Box alignItems='flex-end' display='flex'>
          <Typo className={classes.spaceRight} variant='h1'>
            {employee.firstName} {employee.lastName}
          </Typo>
          {employee.hrManager && (
            <Typo variant='body1'>
              Ansvarlig: {employee.hrManager.firstName} {employee.hrManager.lastName}
            </Typo>
          )}
        </Box>
        <Box display='flex' justifyContent='space-between' mb={theme.spacing(4)}>
          <Typo variant='body1'>
            {year} {history.find((element) => element.slug === process)?.title}
          </Typo>
          <Box display='flex'>
            <Button aria-controls='filer' aria-haspopup='true' className={classes.spaceRight} color='primary' onClick={() => null}>
              Filer
            </Button>
            <Button
              aria-controls='historikk meny'
              aria-haspopup='true'
              color='primary'
              disabled={history.every((element) => !element.years.length)}
              onClick={handleClick}>
              Historikk
            </Button>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              getContentAnchorEl={null}
              id='history-menu'
              keepMounted
              onClose={handleClose}
              open={Boolean(anchorEl)}>
              {history.map((process) => {
                return process.years.map((yearObject) => {
                  const year = new Date(yearObject.year).getFullYear();
                  return (
                    <Link href={`/ansatt/${employee.id}?år=${year}&prosess=${process.slug}`} key={`${process.title} ${year}`}>
                      <MenuItem onClick={handleClose}>
                        {year} {process.title}
                      </MenuItem>
                    </Link>
                  );
                });
              })}
            </Menu>
          </Box>
        </Box>
        <EmployeeContext.Provider value={{ employee }}>
          {phasesWithTasks.map((phase) => {
            return <Phase key={phase.title} tasks={phase.tasks} tasksFinished={phase.finishedTasks} title={phase.title} totalTasks={phase.totalTasks} />;
          })}
        </EmployeeContext.Provider>
      </div>
    </>
  );
};

export default Employee;