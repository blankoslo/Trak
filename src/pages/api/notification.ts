import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { slackMessager } from 'utils/utils';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      body: { description, slack_description, employee_id, email, created_by },
    } = req;
    try {
      const newNotification = await trakClient.notification.create({
        data: {
          employee_id: employee_id,
          description: description,
          ...(created_by && {
            created_by: parseInt(created_by.id),
          }),
        },
      });
      if (email) {
        slackMessager(email, slack_description);
      }
      res.status(HttpStatusCode.CREATED).json(newNotification);
    } catch (err) {
      if (err) {
        res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
      }
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
