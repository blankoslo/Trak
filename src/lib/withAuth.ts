import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';
const secret = process.env.JWT_SECRET;
/**
 * Wrapper for endpoints which needs to be authorized
 * @param handler
 * @returns withAuth-wrapper
 */
const withAuth = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      //eslint-disable-next-line
      console.log('###AUTH###');
      const token = await jwt.getToken({ req, secret });
      // eslint-disable-next-line
      console.log(token);

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
        // eslint-disable-next-line
        console.log(user);
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
