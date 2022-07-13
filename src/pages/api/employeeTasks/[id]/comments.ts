import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse, user) {
  if (req.method === 'POST') {
    const {
      body: { text },
      query: { id },
    } = req;

    try {
      const newComment = await trakClient.employee_task_comment.create({
        data: {
          text: text.toString(),
          created_by_id: user.id,
          employee_task_id: id.toString(),
        },
        include: {
          created_by: true,
          employee_task: true,
        },
      });
      res.status(HttpStatusCode.OK).json(newComment);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err) {
        res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
      }
    }
  } else if (req.method === 'GET') {
    const {
      query: { id },
    } = req;
    try {
      const comments = await trakClient.employee_task_comment.findMany({
        where: {
          employee_task_id: id.toString(),
        },
        include: {
          created_by: true,
          employee_task: {
            select: {
              task: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: 'asc',
        },
      });
      res.json(comments);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: err?.meta?.cause });
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
