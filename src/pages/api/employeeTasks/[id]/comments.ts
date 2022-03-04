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
      const newComment = await trakClient.comment.create({
        data: {
          text: text,
          createdById: user.id,
          employeeTaskId: id.toString(),
        },
        include: {
          createdByEmployee: true,
          employeeTask: true,
        },
      });
      res.status(HttpStatusCode.OK).json(newComment);
    } catch (err) {
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
      const comments = await trakClient.comment.findMany({
        where: {
          employeeTaskId: id.toString(),
        },
        include: {
          createdByEmployee: true,
          employeeTask: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      res.json(comments);
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: err?.meta?.cause });
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
