import { PrismaClient } from '@prisma/client';
import HttpStatusCode from 'http-status-typed';
import { groupBy } from 'lodash';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IEmployee } from 'utils/types';
import { addDays, slackMessager } from 'utils/utils';
const prisma = new PrismaClient();
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const CRON_SECRET = process.env.CRON_SECRET;

  if (req.headers.cron_secret !== CRON_SECRET) {
    res.status(HttpStatusCode.UNAUTHORIZED).end();
  }
  if (req.method === 'POST') {
    const phases = await prisma.phase.findMany({
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
    const employees = await prisma.employee.findMany({
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

    const responsibleEmployees = await prisma.employee.findMany({
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

    prisma.$disconnect();

    employeeTaskCreator(phases, employees);
    createNotification(responsibleEmployees);

    res.status(HttpStatusCode.OK).end();
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}

const employeeTaskCreator = (phases, employees) => {
  const lopendePhases = phases.filter((phase) => phase.processTemplate.slug === 'lopende');
  const firstPhase = lopendePhases.reduce((phaseA, phaseB) => (phaseA?.dueDate < phaseB?.dueDate ? phaseA : phaseB));
  employees.forEach((employee) => {
    if (!employee.hrManagerId) {
      return;
    }
    lopendeEmployeeTaskCreator(employee, lopendePhases, firstPhase);
    if (employee.dateOfEmployment && !employeeHasProcessTask(employee, 'onboarding')) {
      onboardingEmployeeTaskCreator(phases, employee);
    }
    if (employee.terminationDate && !employeeHasProcessTask(employee, 'offboarding')) {
      offboardingEmployeeTaskCreator(phases, employee);
    }
  });
};

const lopendeEmployeeTaskCreator = (employee, lopendePhases, firstPhase) => {
  const lopendeTasks = employee.employeeTask.filter((employeeTask) => employeeTask.task.phase.processTemplate.slug === 'lopende');
  const anyActiveTasks = lopendeTasks.some((employeeTask) => !employeeTask.completed);
  if (!anyActiveTasks) {
    const latestDate = lopendeTasks?.reduce((taskA, taskB) => (taskA?.dueDate > taskB?.dueDate ? taskA : taskB), undefined);
    const latestMomentDate = moment(latestDate?.dueDate);
    firstPhase.dueDate = moment(firstPhase.dueDate).set('year', latestMomentDate.year()).format();
    if (latestDate) {
      const validPhases = lopendePhases.filter((phase) => {
        const phaseDate = moment(phase.dueDate);
        if (phaseDate.month() === latestMomentDate.month()) {
          return phaseDate.day() > phaseDate.day();
        }
        return phaseDate.month() > latestMomentDate.month();
      });
      if (validPhases.length) {
        const firstValidPhases = validPhases[0];
        firstValidPhases.dueDate = moment(firstValidPhases.dueDate).set('year', latestMomentDate.year()).format();
        return createEmployeeTasks(employee, firstValidPhases);
      } else {
        const newDueDate = moment(firstPhase.dueDate).add(1, 'y');
        firstPhase.dueDate = newDueDate.format();
        updateActiveYear(employee, newDueDate.toDate());
      }
    }
    createEmployeeTasks(employee, firstPhase);
  }
};

const onboardingEmployeeTaskCreator = (phases, employee) => {
  phases.forEach((phase) => {
    if (phase.processTemplate.slug === 'onboarding') {
      phase.dueDate = addDays(employee.dateOfEmployment, phase.dueDateDayOffset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsNewEmployeeNotificiation = employee.hrManager.employeeSettings?.notificationSettings?.includes('HIRED');
  if (employeeWantsNewEmployeeNotificiation) {
    const notificationText = `${employee.firstName} ${employee.lastName} har nettopp startet, og har fått opprettet nye oppgaver i onboarding`;
    notificationSender(employee.hrManagerId, notificationText, employee.hrManager.employeeSettings.slack && employee.hrManager.email);
  }
};
const offboardingEmployeeTaskCreator = (phases, employee) => {
  phases.forEach((phase) => {
    if (phase.processTemplate.slug === 'offboarding') {
      phase.dueDate = addDays(employee.terminationDate, phase.dueDateDayOffset);
      createEmployeeTasks(employee, phase);
    }
  });
  const employeeWantsEmployeeQuittingNotification = employee.hrManager.employeeSettings?.notificationSettings?.includes('TERMINATION');
  if (employeeWantsEmployeeQuittingNotification) {
    const notificationText = `${employee.firstName} ${employee.lastName} skal slutte, og har fått opprettet nye oppgaver i offboarding`;
    notificationSender(employee.hrManagerId, notificationText, employee.hrManager.employeeSettings.slack && employee.hrManager.email);
  }
};
const employeeHasProcessTask = (employee, processTitle) =>
  employee.employeeTask.some((employeeTask) => employeeTask.task.phase.processTemplate.slug === processTitle);

const createEmployeeTasks = async (employee, phase) => {
  const data = phase?.tasks.map((task) => {
    if (task.professions.map(({ id }) => id).includes(employee.professionId)) {
      if (!task.responsibleId && !employee.hrManagerId) {
        return;
      }
      return {
        employeeId: employee.id,
        responsibleId: task.responsibleId || employee.hrManagerId,
        dueDate: phase.dueDate,
        taskId: task.id,
      };
    }
  });

  await prisma.employeeTask.createMany({ data: data, skipDuplicates: true });
};

const updateActiveYear = async (employee: IEmployee, newYear: Date) => {
  await prisma.employee.update({
    where: {
      id: employee.id,
    },
    data: {
      activeYear: newYear,
    },
  });
};

const createNotification = async (responsibleEmployees) => {
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
      dates.forEach((d) => {
        const date = moment(d);
        let notificationText = undefined;
        if (employeeWantsPhaseEndsTodayNotification && moment(today).isSame(date, 'day')) {
          notificationText = `Du har oppgaver som utgår idag`;
        } else if (employeeWantsPhaseEndsNextWeekNotification && moment(nextWeek).isSame(date, 'day')) {
          notificationText = `Du har oppgaver som utgår om en uke`;
        }
        if (notificationText) {
          notificationSender(employee.id, notificationText, employee.employeeSettings.slack && employee.email);
        }
      });
    });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
  }
};

const notificationSender = async (employeeId, description, email = undefined) => {
  await prisma.notification.create({
    data: {
      employeeId: employeeId,
      description: description,
    },
  });
  if (email) {
    slackMessager(email, description);
  }
};
