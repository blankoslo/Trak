import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      body: { data, process_template_id },
    } = req;
    const newPhase = await trakClient.phase.create({
      data: {
        title: data.title,
        process_template_id: process_template_id,
        due_date_day_offset: data.due_date_day_offset,
        due_date: data.due_date,
      },
    });
    res.status(HttpStatusCode.CREATED).json(newPhase);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
