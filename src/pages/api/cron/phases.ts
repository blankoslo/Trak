import { addDays, compareAsc, getDate, getMonth, getYear, isSameDay, setYear, subDays } from 'date-fns';
import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import { groupBy } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient as BlankClient } from 'prisma/generated/blank';
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

    const phases = await trakClient.phase.findMany({
      where: {
        active: true,
      },
      orderBy: {
        dueDate: 'asc',
      },
      select: {
        id: true,
        title: true,
        dueDate: true,
        dueDateDayOffset: true,
        processTemplateId: true,
        processTemplate: {
          select: {
            slug: true,
          },
        },
        tasks: {
          where: {
            global: true,
            active: true,
          },
          select: {
            id: true,
            dueDate: true,
            dueDateDayOffset: true,
            responsibleType: true,
            responsibleId: true,
            professions: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    const employees = await trakClient.employee.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        terminationDate: true,
        dateOfEmployment: true,
        professionId: true,
        hrManagerId: true,
        hrManager: {
          select: {
            email: true,
            employeeSettings: {
              select: {
                slack: true,
                notificationSettings: true,
              },
            },
          },
        },
        employeeTask: {
          select: {
            id: true,
            completed: true,
            dueDate: true,
            task: {
              select: {
                responsibleType: true,
                phase: {
                  select: {
                    id: true,
                    title: true,
                    dueDate: true,
                    processTemplate: true,
                    processTemplateId: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const responsibleEmployees = await trakClient.employee.findMany({
      where: {
        responsibleEmployeeTask: {
          some: {
            completed: false,
          },
        },
      },
      select: {
        id: true,
        email: true,
        responsibleEmployeeTask: {
          where: {
            completed: false,
          },
          select: {
            dueDate: true,
          },
        },
        employeeSettings: {
          select: {
            slack: true,
            notificationSettings: true,
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
  const lopendePhases = phases.filter((phase) => phase.processTemplate.slug === Process.LOPENDE);
  const today = new Date();
  employees.forEach(async (employee) => {
    const [currentPhase, nextPhase] = getCurrentAndNextLopendePhase(lopendePhases, today);
    const projectManager = await getProjectManager(employee, currentPhase, nextPhase);

    if (!employee.hrManagerId && !projectManager) {
      return;
    }
    if (!employee.terminationDate) {
      lopendeEmployeeTaskCreator(employee, nextPhase, projectManager, today);
    }
    if (employee.dateOfEmployment && !employeeHasProcessTask(employee, Process.ONBOARDING)) {
      onboardingEmployeeTaskCreator(phases, employee, sendNotification);
    }
    if (employee.terminationDate && !employeeHasProcessTask(employee, Process.OFFBOARDING)) {
      offboardingEmployeeTaskCreator(phases, employee, sendNotification);
    }
  });
};

const getCurrentAndNextLopendePhase = (lopendePhases: IPhase[], today: Date) => {
  const comingPhases = lopendePhases.filter((phase) => {
    const dueDate = subDays(phase.dueDate, 7);
    if (getMonth(dueDate) === getMonth(today)) {
      return getDate(dueDate) > getDate(today);
    }

    return getMonth(dueDate) > getMonth(today);
  });
  if (!comingPhases.length) {
    return;
  }

  const nextPhase = comingPhases?.reduce((phaseA, phaseB) => {
    if (getMonth(phaseA.dueDate) === getMonth(phaseB.dueDate)) {
      return getDate(phaseA.dueDate) > getDate(phaseB.dueDate) ? phaseB : phaseA;
    }

    return phaseA.dueDate.getMonth() > phaseB.dueDate.getMonth() ? phaseB : phaseA;
  });
  const index = lopendePhases.findIndex((phase) => phase.id === nextPhase.id);
  const currentPhaseIndex = index === 0 ? lopendePhases.length - 1 : index - 1;
  const currentPhase = lopendePhases[currentPhaseIndex];
  nextPhase.dueDate = setYear(nextPhase.dueDate, getYear(today));
  return [currentPhase, nextPhase];
};

const lopendeEmployeeTaskCreator = (employee: IEmployee, nextPhase: IPhase, projectManager: IEmployee['id'], today: Date) => {
  const hasTasksInNextPhase = employee.employeeTask.some(
    (employeeTask: IEmployeeTask) => employeeTask.task.phase.id === nextPhase.id && getYear(employeeTask.dueDate) === getYear(today),
  );

  const hasStarted = compareAsc(employee.dateOfEmployment, new Date()) <= 0;

  if (!hasTasksInNextPhase && hasStarted) {
    createEmployeeTasks(employee, nextPhase, projectManager);
  }
};

const onboardingEmployeeTaskCreator = async (phases: IPhase[], employee: IEmployee, sendNotification: boolean) => {
  phases.forEach((phase) => {
    if (phase.processTemplate.slug === Process.ONBOARDING) {
      phase.dueDate = addDays(employee.dateOfEmployment, phase.dueDateDayOffset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsNewEmployeeNotificiation = employee.hrManager.employeeSettings?.notificationSettings?.includes('HIRED');
  if (employeeWantsNewEmployeeNotificiation) {
    const notificationText = `${employee.firstName} ${employee.lastName} har fått opprettet oppgaver i onboarding`;
    if (sendNotification) {
      await notificationSender(employee.hrManagerId, notificationText, employee.hrManager.employeeSettings.slack && employee.hrManager.email);
    }
  }
};

const offboardingEmployeeTaskCreator = async (phases: IPhase[], employee: IEmployee, sendNotification: boolean) => {
  phases.forEach((phase) => {
    if (phase.processTemplate.slug === Process.OFFBOARDING) {
      phase.dueDate = addDays(employee.terminationDate, phase.dueDateDayOffset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsEmployeeQuittingNotification = employee.hrManager.employeeSettings?.notificationSettings?.includes('TERMINATION');
  if (employeeWantsEmployeeQuittingNotification) {
    const notificationText = `${employee.firstName} ${employee.lastName} har fått opprettet oppgaver i offboarding`;
    if (sendNotification) {
      await notificationSender(employee.hrManagerId, notificationText, employee.hrManager.employeeSettings.slack && employee.hrManager.email);
    }
  }
};

const employeeHasProcessTask = (employee: IEmployee, processTitle: string) =>
  employee.employeeTask.some((employeeTask) => employeeTask.task.phase.processTemplate.slug === processTitle);

const getProjectManager = async (employee: IEmployee, phase: IPhase, lastPhase: IPhase) => {
  if (phase.processTemplateId !== Process.LOPENDE) {
    return;
  }

  const projectsCount = await new BlankClient().staffing.groupBy({
    where: {
      employee: employee.id,
      date: {
        gte: setYear(addDays(lastPhase.dueDate, 1), getYear(new Date())),
        lte: setYear(phase.dueDate, getYear(new Date())),
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
  const projectManager = await new BlankClient().projects.findFirst({
    where: {
      id: projectsCount[0].project,
    },
    select: {
      responsible: true,
    },
  });
  if (!projectManager?.responsible) {
    return employee.hrManagerId;
  }
  const employeeIsProjectManager = projectManager.responsible === employee.id;
  if (employeeIsProjectManager) {
    return employee.hrManagerId;
  }
  return projectManager.responsible;
};
const createEmployeeTasks = async (employee: IEmployee, phase: IPhase, projectManager: IEmployee['id'] | undefined = undefined) => {
  const data = await Promise.all(
    phase?.tasks.map(async (task) => {
      if (task.professions.map(({ id }) => id).includes(employee.professionId)) {
        let taskDueDate = null;
        if (task.dueDate) {
          taskDueDate = task.dueDate;
        } else if (task.dueDateDayOffset) {
          if (phase.processTemplateId === Process.OFFBOARDING) {
            taskDueDate = addDays(employee.terminationDate, task.dueDateDayOffset);
          } else if (phase.processTemplateId === Process.ONBOARDING) {
            taskDueDate = addDays(employee.dateOfEmployment, task.dueDateDayOffset);
          }
        }
        const responsible = (async () => {
          switch (task.responsibleType) {
            case ResponsibleType.OTHER:
              return task.responsibleId;
            case ResponsibleType.PROJECT_MANAGER:
              return projectManager;
            default:
              return employee.hrManagerId;
          }
        })();
        const responsibleId = await responsible;
        if (!responsibleId) {
          return;
        }
        return {
          employeeId: employee.id,
          responsibleId: responsibleId,
          dueDate: taskDueDate || phase.dueDate,
          taskId: task.id,
        };
      }
    }),
  );
  await trakClient.employeeTask.createMany({ data: data, skipDuplicates: true });
};

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const createNotification = async (responsibleEmployees: any | (IEmployee & { responsibleEmployeeTask: IEmployeeTask })[]) => {
  try {
    const today = new Date();
    const nextWeek = new Date().setDate(today.getDate() + 7);
    responsibleEmployees?.forEach((employee) => {
      const notificationSettings = employee?.employeeSettings?.notificationSettings;
      const employeeWantsPhaseEndsTodayNotification = notificationSettings?.includes('DEADLINE');
      const employeeWantsPhaseEndsNextWeekNotification = notificationSettings?.includes('WEEK_BEFORE_DEADLINE');
      if (!employeeWantsPhaseEndsTodayNotification && !employeeWantsPhaseEndsNextWeekNotification) {
        return;
      }
      const dates = Object.keys(groupBy(employee.responsibleEmployeeTask, 'dueDate'));
      dates.forEach(async (d) => {
        const date = new Date(d);
        let notificationText = undefined;
        if (employeeWantsPhaseEndsTodayNotification && isSameDay(today, date)) {
          notificationText = `Du har oppgaver som utgår idag`;
        } else if (employeeWantsPhaseEndsNextWeekNotification && isSameDay(nextWeek, date)) {
          notificationText = `Du har oppgaver som utgår om en uke`;
        }
        if (notificationText) {
          await notificationSender(employee.id, notificationText, employee.employeeSettings.slack && employee.email);
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
      employeeId: employeeId,
      description: description,
    },
  });
  if (email) {
    //await slackMessager(email, description);
  }
};
