import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

    employeesQuery.forEach((employee) => {
      const employeeProcesses = [...new Set(employee.employeeTask.flatMap(({ task }) => task.phase.processTemplateId))];
      employeeProcesses.forEach((employeeProcess) => {
        const index = processTemplates.findIndex((pt) => pt.slug === employeeProcess);
        processTemplates[index].employees.push(employee);
      });
    });
    res.json(processTemplates);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
