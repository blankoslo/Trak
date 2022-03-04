import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const {
      query: { commentId },
    } = req;

    try {
      await trakClient.comment.delete({
        where: {
          id: commentId.toString(),
        },
      });
      res.status(HttpStatusCode.OK).json({ message: 'hei' });
    } catch (err) {
      if (err) {
        res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
      }
    }
  } else if (req.method === 'PUT') {
    const {
      body: { data },
      query: { commentId },
    } = req;
    try {
      const updatedComment = await trakClient.comment.update({
        where: {
          id: commentId.toString(),
        },
        data: {
          text: data.text,
          createdAt: data.createdAt,
        },
      });
      res.status(HttpStatusCode.OK).json(updatedComment);
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
});
