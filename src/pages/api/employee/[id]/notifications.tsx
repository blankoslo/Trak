import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import { toInteger } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { INotification } from 'utils/types';

/**
 * GET
 * @param {string} id
 * @returns {INotification}
 */
export default withAuth(async function (req: NextApiRequest, res: NextApiResponse, user) {
  const {
    query: { id },
  } = req;
  if (user.id.toString() !== id.toString()) {
    res.status(HttpStatusCode.FORBIDDEN).send({ message: 'Kan kun hente egne notifikasjoner' });
  } else if (req.method === 'GET') {
    const notification = await trakClient.notification.findMany({
      where: {
        employeeId: toInteger(id),
        read: false,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    res.status(HttpStatusCode.OK).json(notification);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
