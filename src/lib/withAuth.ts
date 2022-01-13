import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
const secret = process.env.JWT_SECRET;

const withAuth = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const CRON_SECRET = process.env.CRON_SECRET;
      if (req.headers.cron_secret === CRON_SECRET) {
        return handler(req, res);
      }

      const token = await getToken({ req, secret });

      if (token) {
        const user = await trakClient.employee.findUnique({
          where: {
            email: token.email,
          },
          select: {
            id: true,
            email: true,
          },
        });
        if (user) {
          return handler(req, res, user);
        }
      }
      // eslint-disable-next-line no-empty
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      return res.json(err?.message);
    }
    return res.status(HttpStatusCode.UNAUTHORIZED).end();
  };
};

export default withAuth;
