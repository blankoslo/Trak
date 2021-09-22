import HttpStatusCode from 'http-status-typed';
import { NextApiRequest, NextApiResponse } from 'next';
import { syncTrakDatabase } from 'utils/cron';
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await syncTrakDatabase();
      res.status(HttpStatusCode.OK).end();
    } catch (err) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: err });
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
