import HttpStatusCode from 'http-status-typed';
import { syncEmployees } from 'lib/tripletex/syncEmployees';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await syncEmployees();

    res.status(HttpStatusCode.OK).end();
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
