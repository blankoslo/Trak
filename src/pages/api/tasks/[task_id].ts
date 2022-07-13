import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProfession, ResponsibleType } from 'utils/types';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { task_id },
  } = req;
  if (req.method === 'GET') {
    GET(res, task_id);
  } else if (req.method === 'PUT') {
    PUT(req, res, task_id);
  } else if (req.method === 'DELETE') {
    DELETE(res, task_id);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
const GET = async (res, task_id) => {
  try {
    const taskQuery = await trakClient.task.findUnique({
      where: {
        id: task_id.toString(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        phase_id: true,
        link: true,
        responsible_type: true,
        due_date: true,
        due_date_day_offset: true,
        professions: {
          select: {
            title: true,
            slug: true,
          },
        },
        responsible: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            image_url: true,
          },
        },
      },
    });
    const task = { ...taskQuery, professions: taskQuery.professions };
    if (!task) {
      throw new Error('Fant ikke oppgave');
    } else {
      res.status(HttpStatusCode.OK).json(task);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
const PUT = async (req, res, task_id) => {
  const {
    body: { data, phase_id, global },
  } = req;
  if (!data.responsible && data.responsibleType === ResponsibleType.OTHER) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Må sende med en personalansvarlig når man velger 'annen' ansvarlig" });
  }
  try {
    const getTask = await trakClient.task.findUnique({
      where: {
        id: task_id.toString(),
      },
      select: {
        responsible_id: true,
      },
    });
    const updatedTask = await trakClient.task.update({
      where: {
        id: task_id.toString(),
      },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        global: global,
        due_date: data.due_date,
        responsible_type: data.responsible_type,
        due_date_day_offset: data.due_date_day_offset,
        phase: {
          connect: {
            id: phase_id,
          },
        },
        ...(data.responsible && data.responsible_type === ResponsibleType.OTHER
          ? {
              responsible: {
                connect: {
                  id: data.responsible.id,
                },
              },
            }
          : Boolean(getTask.responsible_id) && {
              responsible: {
                disconnect: true,
              },
            }),

        professions: {
          deleteMany: {
            task_id: task_id.toString(),
          },
          createMany: {
            data: data.professions.map((profession: IProfession) => ({ profession_id: profession.slug })),
          },
        },
      },
    });
    res.status(HttpStatusCode.OK).json(updatedTask);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
const DELETE = async (res, task_id) => {
  try {
    const deletedTask = await trakClient.task.update({ where: { id: task_id.toString() }, data: { active: false } });
    res.status(HttpStatusCode.OK).json(deletedTask);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
