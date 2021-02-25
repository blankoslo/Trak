import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  if (req.method === 'GET') {
    GET(res, id);
  } else {
    res.status(405);
    res.end();
  }
}

const GET = async (res, id) => {
  try {
    const employeeTask = await prisma.employeeTask.findUnique({
      where: {
        id: id.toString(),
      },
      select: {
        id: true,
        completed: true,
        year: true,
        dueDate: true,
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        responsible: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
            global: true,
            tags: {
              select: {
                id: true,
                title: true,
              },
            },
            phase: {
              select: {
                id: true,
                title: true,
                processTemplate: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json(employeeTask);
  } catch (err) {
    res.status(404).send({ message: err.meta.cause });
  }
};
