import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { phase_id },
  } = req;
  if (req.method === 'GET') {
    GET(res, phase_id);
  } else if (req.method === 'PUT') {
    PUT(req, res, phase_id);
  } else if (req.method === 'DELETE') {
    DELETE(res, phase_id);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
const GET = async (res, phase_id) => {
  try {
    const phase = await trakClient.phase.findUnique({
      where: {
        id: phase_id.toString(),
      },
      select: {
        id: true,
        title: true,
        due_date_day_offset: true,
        due_date: true,
      },
    });
    if (!phase) {
      throw new Error();
    }
    res.status(HttpStatusCode.OK).json(phase);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
const PUT = async (req, res, phase_id) => {
  const {
    body: { data },
  } = req;
  try {
    const updatedPhase = await trakClient.phase.update({
      where: {
        id: phase_id.toString(),
      },
      data: {
        title: data.title,
        due_date_day_offset: data.due_date_day_offset,
        due_date: data.due_date,
      },
    });
    res.status(HttpStatusCode.OK).json(updatedPhase);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};

const DELETE = async (res, phase_id) => {
  try {
    await trakClient.task.updateMany({
      where: {
        phase_id: phase_id.toString(),
      },
      data: {
        active: false,
      },
    });
    const deletedPhase = await trakClient.phase.update({ where: { id: phase_id.toString() }, data: { active: false } });
    res.status(HttpStatusCode.OK).json(deletedPhase);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
