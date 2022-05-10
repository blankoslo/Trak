import { addDays, compareAsc, getDate, getMonth, getYear, isSameDay, setYear, subDays } from 'date-fns';
import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import { groupBy } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { syncTrakDatabase } from 'utils/cron';
import { IEmployee, IEmployeeTask, IPhase, ResponsibleType } from 'utils/types';
import { Process } from 'utils/types';
let LAST_RUN = undefined;
export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  const { notification } = req.query;
  const sendNotification = notification === undefined ? true : notification === 'true';

  if (req.method === 'POST') {
    if (LAST_RUN === new Date()) {
      return;
    }
    LAST_RUN = new Date();

    await syncTrakDatabase();

    const phasesQuery = await trakClient.phase.findMany({
      where: {
        active: true,
      },
      orderBy: {
        due_date: 'asc',
      },
      select: {
        id: true,
        title: true,
        due_date: true,
        due_date_day_offset: true,
        process_template_id: true,
        tasks: {
          where: {
            global: true,
            active: true,
          },
          select: {
            id: true,
            due_date: true,
            due_date_day_offset: true,
            responsible_type: true,
            responsible_id: true,
            professions: {
              select: {
                profession_id: true,
              },
            },
          },
        },
      },
    });

    const phases = phasesQuery.map((phase) => ({
      ...phase,
      tasks: phase.tasks.map((task) => ({ ...task, professions: task.professions.map((profession) => profession.profession_id) })),
    }));

    const employees = await trakClient.employees.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        termination_date: true,
        date_of_employment: true,
        profession_id: true,
        hr_manager_id: true,
        hr_manager: {
          select: {
            email: true,
            employee_settings: {
              select: {
                deadline: true,
                delegate: true,
                hired: true,
                slack: true,
                termination: true,
                week_before_deadline: true,
              },
            },
          },
        },
        employee_tasks: {
          select: {
            id: true,
            completed: true,
            due_date: true,
            task: {
              select: {
                responsible_type: true,
                phase: {
                  select: {
                    id: true,
                    title: true,
                    due_date: true,
                    process_template: true,
                    process_template_id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const responsibleEmployees = await trakClient.employees.findMany({
      where: {
        responsible_tasks: {
          some: {
            completed: false,
          },
        },
      },
      select: {
        id: true,
        email: true,
        responsible_tasks: {
          where: {
            completed: false,
          },
          select: {
            due_date: true,
          },
        },
        employee_settings: {
          select: {
            deadline: true,
            delegate: true,
            hired: true,
            slack: true,
            termination: true,
            week_before_deadline: true,
          },
        },
      },
    });
    employeeTaskCreator(phases, employees, sendNotification);
    if (sendNotification) {
      await createNotification(responsibleEmployees);
    }

    res.status(HttpStatusCode.OK).end();
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const employeeTaskCreator = (phases: IPhase[] | any, employees: IEmployee[] | any, sendNotification: boolean) => {
  const lopendePhases = phases.filter((phase) => phase.process_template_id === Process.LOPENDE);
  const today = new Date();
  employees.forEach((employee) => {
    if (!employee.hr_manager_id) {
      return;
    }
    if (!employee.termination_date) {
      lopendeEmployeeTaskCreator(employee, lopendePhases, today);
    }
    if (employee.date_of_employment && !employeeHasProcessTask(employee, Process.ONBOARDING)) {
      onboardingEmployeeTaskCreator(phases, employee, sendNotification);
    }
    if (employee.termination_date && !employeeHasProcessTask(employee, Process.OFFBOARDING)) {
      offboardingEmployeeTaskCreator(phases, employee, sendNotification);
    }
  });
};

const lopendeEmployeeTaskCreator = (employee: IEmployee, lopendePhases: IPhase[], today: Date) => {
  const comingPhases = lopendePhases.filter((phase) => {
    const dueDate = subDays(phase.due_date, 7);
    if (getMonth(dueDate) === getMonth(today)) {
      return getDate(dueDate) > getDate(today);
    }

    return getMonth(dueDate) > getMonth(today);
  });
  if (!comingPhases.length) {
    return;
  }

  const nextPhase = comingPhases?.reduce((phaseA, phaseB) => {
    if (getMonth(phaseA.due_date) === getMonth(phaseB.due_date)) {
      return getDate(phaseA.due_date) > getDate(phaseB.due_date) ? phaseB : phaseA;
    }

    return phaseA.due_date.getMonth() > phaseB.due_date.getMonth() ? phaseB : phaseA;
  });
  const index = lopendePhases.findIndex((phase) => phase.id === nextPhase.id);
  const currentPhaseIndex = index === 0 ? lopendePhases.length - 1 : index - 1;
  const currentPhase = lopendePhases[currentPhaseIndex];
  const hasTasksInNextPhase = employee.employee_tasks?.some(
    (employeeTask: IEmployeeTask) => employeeTask.task.phase.id === nextPhase.id && getYear(employeeTask.due_date) === getYear(today),
  );

  const hasStarted = compareAsc(employee.date_of_employment, new Date()) <= 0;

  if (!hasTasksInNextPhase && hasStarted) {
    nextPhase.due_date = setYear(nextPhase.due_date, getYear(today));
    createEmployeeTasks(employee, nextPhase, currentPhase);
  }
};

const onboardingEmployeeTaskCreator = async (phases: IPhase[], employee: IEmployee, sendNotification: boolean) => {
  phases.forEach((phase) => {
    if (phase.process_template_id === Process.ONBOARDING) {
      phase.due_date = addDays(employee.date_of_employment, phase.due_date_day_offset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsNewEmployeeNotificiation = employee.hr_manager?.employee_settings?.hired;
  if (employeeWantsNewEmployeeNotificiation) {
    const notificationText = `${employee.first_name} ${employee.last_name} har fått opprettet oppgaver i onboarding`;
    if (sendNotification) {
      await notificationSender(employee.hr_manager_id, notificationText, employee.hr_manager?.employee_settings?.slack && employee.hr_manager.email);
    }
  }
};

const offboardingEmployeeTaskCreator = async (phases: IPhase[], employee: IEmployee, sendNotification: boolean) => {
  phases.forEach((phase) => {
    if (phase.process_template_id === Process.OFFBOARDING) {
      phase.due_date = addDays(employee.termination_date, phase.due_date_day_offset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsEmployeeQuittingNotification = employee.hr_manager?.employee_settings?.termination;
  if (employeeWantsEmployeeQuittingNotification) {
    const notificationText = `${employee.first_name} ${employee.last_name} har fått opprettet oppgaver i offboarding`;
    if (sendNotification) {
      await notificationSender(employee.hr_manager_id, notificationText, employee.hr_manager?.employee_settings?.slack && employee.hr_manager.email);
    }
  }
};

const employeeHasProcessTask = (employee: IEmployee, processTitle: string) =>
  employee.employee_tasks?.some((employeeTask) => employeeTask.task.phase.process_template.slug === processTitle);

const getProjectManager = async (employee: IEmployee, phase: IPhase, lastPhase: IPhase) => {
  if (phase.process_template_id !== Process.LOPENDE) {
    return;
  }

  const projectsCount = await trakClient.staffing.groupBy({
    where: {
      employee: employee.id,
      date: {
        gte: setYear(addDays(lastPhase.due_date, 1), getYear(new Date())),
        lte: setYear(phase.due_date, getYear(new Date())),
      },
      projects: {
        active: true,
      },
    },
    // #TODO:
    // What if two are equal? @magne?
    take: 1,
    orderBy: {
      _count: {
        project: 'desc',
      },
    },
    by: ['project', 'employee'],
    _count: {
      project: true,
    },
  });
  const employeeIsOnProject = projectsCount.length > 0;
  if (!employeeIsOnProject) {
    return;
  }
  const projectManager = await trakClient.projects.findFirst({
    where: {
      id: projectsCount[0].project,
    },
    select: {
      responsible: true,
    },
  });
  if (!projectManager?.responsible) {
    return employee.hr_manager_id;
  }
  const employeeIsProjectManager = projectManager.responsible === employee.id;
  if (employeeIsProjectManager) {
    return employee.hr_manager_id;
  }
  return projectManager.responsible;
};
const createEmployeeTasks = async (employee: IEmployee, phase: IPhase, lastPhase: IPhase | undefined = undefined) => {
  const projectManager = getProjectManager(employee, phase, lastPhase);
  const data = await Promise.all(
    phase?.tasks.map(async (task) => {
      // @ts-ignore
      if (task.professions.includes(employee.profession_id)) {
        let taskDueDate = null;
        if (task.due_date) {
          taskDueDate = task.due_date;
        } else if (task.due_date_day_offset) {
          if (phase.process_template_id === Process.OFFBOARDING) {
            taskDueDate = addDays(employee.termination_date, task.due_date_day_offset);
          } else if (phase.process_template_id === Process.ONBOARDING) {
            taskDueDate = addDays(employee.date_of_employment, task.due_date_day_offset);
          }
        }
        const responsible = (async () => {
          switch (task.responsible_type) {
            case ResponsibleType.OTHER:
              return task.responsible_id;
            case ResponsibleType.PROJECT_MANAGER:
              return projectManager;
            default:
              return employee.hr_manager_id;
          }
        })();
        const responsibleId = await responsible;
        if (!responsibleId) {
          return;
        }
        return {
          employee_id: employee.id,
          responsible_id: responsibleId,
          due_date: taskDueDate || phase.due_date,
          task_id: task.id,
        };
      }
    }),
  );
  await trakClient.employee_task.createMany({ data: data, skipDuplicates: true });
};

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const createNotification = async (responsibleEmployees: any | (IEmployee & { responsibleEmployeeTask: IEmployeeTask })[]) => {
  try {
    const today = new Date();
    const nextWeek = new Date().setDate(today.getDate() + 7);
    responsibleEmployees?.forEach((employee) => {
      const employeeWantsPhaseEndsTodayNotification = employee.employee_settings?.deadline;
      const employeeWantsPhaseEndsNextWeekNotification = employee.employee_settings?.week_before_deadline;
      if (!employeeWantsPhaseEndsTodayNotification && !employeeWantsPhaseEndsNextWeekNotification) {
        return;
      }
      const dates = Object.keys(groupBy(employee.responsibleEmployeeTask, 'due_date'));
      dates.forEach(async (d) => {
        const date = new Date(d);
        let notificationText = undefined;
        if (employeeWantsPhaseEndsTodayNotification && isSameDay(today, date)) {
          notificationText = `Du har oppgaver som utgår idag`;
        } else if (employeeWantsPhaseEndsNextWeekNotification && isSameDay(nextWeek, date)) {
          notificationText = `Du har oppgaver som utgår om en uke`;
        }
        if (notificationText) {
          await notificationSender(employee.id, notificationText, employee.employee_settings?.slack && employee.email);
        }
      });
    });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
  }
};

const notificationSender = async (employeeId: number, description: string, email: string = undefined) => {
  await trakClient.notification.create({
    data: {
      employee_id: employeeId,
      description: description,
    },
  });
  if (email) {
    //await slackMessager(email, description);
  }
};
