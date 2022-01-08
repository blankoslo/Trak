import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';
export default withAuth(async function (req: NextApiRequest, res: NextApiResponse, user) {
  if (req.method === 'GET') {
    const unreadNotifications = await trakClient.notification.count({
      where: {
        read: false,
        employeeId: user.id,
      },
    });
    res.status(HttpStatusCode.OK).json({ unreadNotifications: unreadNotifications });
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
