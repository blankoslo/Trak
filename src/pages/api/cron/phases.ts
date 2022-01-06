import { compareAsc } from 'date-fns';
import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import { groupBy } from 'lodash';
import moment, { Moment } from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { syncTrakDatabase } from 'utils/cron';
import { IEmployee, IEmployeeTask, IPhase } from 'utils/types';
import { Process } from 'utils/types';
import { addDays, slackMessager } from 'utils/utils';
let LAST_RUN = undefined;
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const CRON_SECRET = process.env.CRON_SECRET;
  if (req.headers.cron_secret !== CRON_SECRET) {
    res.status(HttpStatusCode.UNAUTHORIZED).end();
  }
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
                phase: {
                  select: {
                    id: true,
                    title: true,
                    processTemplate: true,
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
    employeeTaskCreator(phases, employees);
    await createNotification(responsibleEmployees);

    res.status(HttpStatusCode.OK).end();
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const employeeTaskCreator = (phases: IPhase[] | any, employees: IEmployee[] | any) => {
  const lopendePhases = phases.filter((phase) => phase.processTemplate.slug === Process.LOPENDE);
  const today = moment();
  employees.forEach((employee) => {
    if (!employee.hrManagerId) {
      return;
    }
    if (!employee.terminationDate) {
      lopendeEmployeeTaskCreator(employee, lopendePhases, today);
    }
    if (employee.dateOfEmployment && !employeeHasProcessTask(employee, Process.ONBOARDING)) {
      onboardingEmployeeTaskCreator(phases, employee);
    }
    if (employee.terminationDate && !employeeHasProcessTask(employee, Process.OFFBOARDING)) {
      offboardingEmployeeTaskCreator(phases, employee);
    }
  });
};

const lopendeEmployeeTaskCreator = (employee: IEmployee, lopendePhases: IPhase[], today: Moment) => {
  const comingPhases = lopendePhases.filter((phase) => {
    const dueDate = moment(phase.dueDate).subtract(1, 'week');
    if (dueDate.month() === today.month()) {
      return dueDate.day() > today.day();
    }

    return dueDate.month() > today.month();
  });
  if (!comingPhases.length) {
    return;
  }
  const nextPhase = comingPhases?.reduce((phaseA, phaseB) => {
    const dueDatePhaseA = moment(phaseA.dueDate);
    const dueDatePhaseB = moment(phaseB.dueDate);
    if (dueDatePhaseA.month() === dueDatePhaseB.month()) {
      return dueDatePhaseA.day() > dueDatePhaseB.day() ? phaseB : phaseA;
    }

    return dueDatePhaseA.month() > dueDatePhaseB.month() ? phaseB : phaseA;
  });
  const hasTasksInNextPhase = employee.employeeTask.some(
    (employeeTask: IEmployeeTask) => employeeTask.task.phase.id === nextPhase.id && moment(employeeTask.dueDate).year() === today.year(),
  );

  const hasStarted = compareAsc(employee.dateOfEmployment, new Date()) <= 0;

  if (!hasTasksInNextPhase && hasStarted) {
    nextPhase.dueDate = moment(nextPhase.dueDate).set('y', today.year()).toDate();
    createEmployeeTasks(employee, nextPhase);
  }
};

const onboardingEmployeeTaskCreator = async (phases: IPhase[], employee: IEmployee) => {
  phases.forEach((phase) => {
    if (phase.processTemplate.slug === Process.ONBOARDING) {
      phase.dueDate = addDays(employee.dateOfEmployment, phase.dueDateDayOffset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsNewEmployeeNotificiation = employee.hrManager.employeeSettings?.notificationSettings?.includes('HIRED');
  if (employeeWantsNewEmployeeNotificiation) {
    const notificationText = `${employee.firstName} ${employee.lastName} har nettopp startet, og har fått opprettet nye oppgaver i onboarding`;
    await notificationSender(employee.hrManagerId, notificationText, employee.hrManager.employeeSettings.slack && employee.hrManager.email);
  }
};

const offboardingEmployeeTaskCreator = async (phases: IPhase[], employee: IEmployee) => {
  phases.forEach((phase) => {
    if (phase.processTemplate.slug === Process.OFFBOARDING) {
      phase.dueDate = addDays(employee.terminationDate, phase.dueDateDayOffset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsEmployeeQuittingNotification = employee.hrManager.employeeSettings?.notificationSettings?.includes('TERMINATION');
  if (employeeWantsEmployeeQuittingNotification) {
    const notificationText = `${employee.firstName} ${employee.lastName} skal slutte, og har fått opprettet nye oppgaver i offboarding`;
    await notificationSender(employee.hrManagerId, notificationText, employee.hrManager.employeeSettings.slack && employee.hrManager.email);
  }
};

const employeeHasProcessTask = (employee: IEmployee, processTitle: string) =>
  employee.employeeTask.some((employeeTask) => employeeTask.task.phase.processTemplate.slug === processTitle);

const createEmployeeTasks = async (employee: IEmployee, phase: IPhase) => {
  const data = phase?.tasks.map((task) => {
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

      if (!task.responsibleId && !employee.hrManagerId) {
        return;
      }
      return {
        employeeId: employee.id,
        responsibleId: task.responsibleId || employee.hrManagerId,
        dueDate: taskDueDate || phase.dueDate,
        taskId: task.id,
      };
    }
  });
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
        const date = moment(d);
        let notificationText = undefined;
        if (employeeWantsPhaseEndsTodayNotification && moment(today).isSame(date, 'day')) {
          notificationText = `Du har oppgaver som utgår idag`;
        } else if (employeeWantsPhaseEndsNextWeekNotification && moment(nextWeek).isSame(date, 'day')) {
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
    await slackMessager(email, description);
  }
};
