import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import safeJsonStringify from 'safe-json-stringify';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const processTemplates = [
      { title: 'offboarding', employees: [] },
      { title: 'onboarding', employees: [] },
      { title: 'lopende', employees: [] },
    ];
    const employeesQuery = await trakClient.employee.findMany({
      where: {
        profession: {
          NOT: {
            title: 'Annet',
          },
        },
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
    res.json(processTemplates);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
