import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import { toInteger } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse, user) {
  const {
    query: { id },
  } = req;
  if (user.id.toString() !== id.toString()) {
    res.status(HttpStatusCode.FORBIDDEN).send({ message: 'Kan kun hente egne notifikasjoner' });
  } else if (req.method === 'GET') {
    const notification = await trakClient.notification.findMany({
      where: {
        employee_id: toInteger(id),
        read: false,
      },
      include: {
        created_by_employee: {
          select: {
            image_url: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    });
    res.status(HttpStatusCode.OK).json(notification);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
