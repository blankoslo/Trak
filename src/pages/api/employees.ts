import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';
export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const today = new Date();
    const employees = await trakClient.employee.findMany({
      where: {
        OR: [
          {
            termination_date: null,
          },
          {
            termination_date: {
              gte: today,
            },
          },
        ],
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        image_url: true,
        employee_settings: true,
      },
      orderBy: [
        {
          first_name: 'asc',
        },
        {
          last_name: 'asc',
        },
      ],
    });
    res.json(employees);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
