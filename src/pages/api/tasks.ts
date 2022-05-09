import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProfession, ResponsibleType } from 'utils/types';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      body: { data, phase_id, global },
    } = req;

    if (!data.responsible && data.responsible_type === ResponsibleType.OTHER) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Må sende med en personalansvarlig når man velger 'annen' ansvarlig" });
    }

    const newTask = await trakClient.task.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        global: global,
        due_date: data.due_date,
        due_date_day_offset: data.due_date_day_offset,
        responsible_type: data.responsible_type,
        phase: {
          connect: {
            id: phase_id,
          },
        },
        professions: {
          create: data.professions.map((profession: IProfession) => ({
            profession: {
              connect: {
                slug: profession.slug,
              },
            },
          })),
        },
        ...(data.responsible &&
          data.responsible_type === ResponsibleType.OTHER && {
            responsible: {
              connect: {
                id: parseInt(data.responsible.id),
              },
            },
          }),
      },
      include: {
        professions: true,
      },
    });
    res.status(HttpStatusCode.CREATED).json(newTask);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
