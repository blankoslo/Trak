import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import { sortBy } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import safeJsonStringify from 'safe-json-stringify';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const initialProcessTemplates = [
      { title: 'Offboarding', tasks: [] },
      { title: 'Onboarding', tasks: [] },
      { title: 'Løpende', tasks: [] },
    ];
    const query = await trakClient.employeeTask.findMany({
      where: {
        completed: {
          equals: false,
        },
      },

      orderBy: [
        {
          dueDate: 'asc',
        },
      ],
      include: {
        responsible: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true,
            id: true,
          },
        },
        employee: {
          select: {
            imageUrl: true,
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        task: {
          select: {
            title: true,
            phase: {
              select: {
                processTemplateId: true,
                processTemplate: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const tasks = JSON.parse(safeJsonStringify(query));
    tasks.forEach((employeeTask) => {
      const processTemplate = employeeTask.task.phase.processTemplate.title;
      const index = initialProcessTemplates.findIndex((pt) => pt.title === processTemplate);
      initialProcessTemplates[index].tasks.push(employeeTask);
    });
    const processTemplates = initialProcessTemplates.map((processTemplate) => {
      return { ...processTemplate, tasks: sortBy(processTemplate.tasks, ['dueDate', 'employee.firstName', 'employee.lastName']) };
    });

    res.json(processTemplates);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
