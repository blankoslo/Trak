import { add, sub } from 'date-fns';
import isMonday from 'date-fns/isMonday';
import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import { compact, flatten, uniq } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToday } from 'utils/date';
import { slackMessager } from 'utils/utils';
export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      if (!isMonday(getToday())) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Ikke mandag' });
        return;
      }
      const employeeTasks = await trakClient.employeeTask.findMany({
        where: {
          completed: {
            equals: false,
          },
        },
        select: {
          responsibleId: true,
          completedById: true,
        },
      });
      const responsible_employee_ids = await compact(await uniq(await flatten(await employeeTasks.map((e) => [e.responsibleId, e.completedById]))));
      await responsible_employee_ids.map(async (id) => {
        const employee_data = await trakClient.employee.findFirst({
          where: {
            id: id,
          },
          select: {
            email: true,
            employeeSettings: {
              select: {
                slack: true,
              },
            },
          },
        });
        if (!employee_data.employeeSettings?.slack) {
          return;
        }
        const myCompletedTasks = await getMyCompletedTasks(id);
        const myExpiredTasks = await getExpiredTasks(id);
        const myUpcomingTasks = await getUpcomingTasks(id);

        const wrappedMessage = createWrappedMessage(myCompletedTasks, myExpiredTasks, myUpcomingTasks);
        await slackMessager(employee_data.email, wrappedMessage);
      });

      res.status(HttpStatusCode.OK).end();
    } catch (err) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: err });
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});

const getMyCompletedTasks = async (id: number) =>
  await trakClient.employeeTask.count({
    where: {
      completedById: id,
      completed: true,
      completedDate: {
        gte: sub(getToday(), { weeks: 1 }),
      },
    },
  });

const getExpiredTasks = async (id: number) =>
  await trakClient.employeeTask.count({
    where: {
      responsibleId: id,
      dueDate: {
        lt: getToday(),
      },
      completed: {
        equals: false,
      },
    },
  });

const getUpcomingTasks = async (id: number) =>
  await trakClient.employeeTask.count({
    where: {
      responsibleId: id,
      dueDate: {
        gte: getToday(),
        lt: add(getToday(), { weeks: 1 }),
      },
      completed: {
        equals: false,
      },
    },
  });

const createWrappedMessage = (myCompetedTasks, myExpiredTasks, myUpcomingTasks) => {
  const unwrappedString = `
Din ukentlige oppsummering 🚧
• Du fullførte *${myCompetedTasks ? `${myCompetedTasks}* ${pluralTaskText(myCompetedTasks)} forrige uke ✔️` : `ingen* oppgaver forrige uke 😴`}
• Du har *${myExpiredTasks ? `${myExpiredTasks}* ${pluralTaskText(myExpiredTasks)} som har forfalt 💀` : `ingen* forfalt oppgaver 🥇`}
• ${myUpcomingTasks ? `Denne uken forfaller *${myUpcomingTasks}* ${pluralTaskText(myUpcomingTasks)} ⏰` : `Du har *ingen* oppgaver som forfaller denne uken 🌴`}

Du kan se oppgavene dine <${process.env.NEXT_PUBLIC_TRAK_URL}|her>

Ha en strålende uke ☀️
Hilsen traky 🤖
`;

  return unwrappedString;
};

const pluralTaskText = (count) => `oppgave${count > 1 ? 'r' : ''}`;
