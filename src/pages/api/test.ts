import HttpStatusCode from 'http-status-typed';
import { blankClient, trakClient } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blank = await blankClient.employees.findMany({
        select: {
          first_name: true,
        },
      });
      const trak = await trakClient.tag.findMany({
        select: {
          title: true,
        },
      });
      console.log(blank, trak);
    } catch (err) {
      console.log(err);
    }
    res.status(HttpStatusCode.OK).json('ok');
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
