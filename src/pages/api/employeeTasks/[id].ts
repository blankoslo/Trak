import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse, user) {
  const {
    query: { id },
  } = req;
  if (req.method === 'GET') {
    GET(res, id);
  } else if (req.method === 'PUT') {
    PUT(req, res, id, user);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});
const GET = async (res, id) => {
  try {
    const employeeTask = await trakClient.employee_task.findUnique({
      where: {
        id: id.toString(),
      },
      select: {
        id: true,
        completed: true,
        due_date: true,
        completed_by: true,
        completed_by_id: true,
        completed_date: true,
        comments: {
          include: {
            created_by: true,
          },
        },
        employee: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        responsible: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            description: true,
            global: true,
            phase: {
              select: {
                id: true,
                title: true,
                process_template: {
                  select: {
                    slug: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!employeeTask) {
      throw new Error();
    }
    res.status(HttpStatusCode.OK).json(employeeTask);
  } catch (err) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};

export type employeeTaskUpdateData = {
  body: {
    completed: boolean;
    due_date: Date;
    responsible_id: number;
  };
};

const PUT = async (req, res, id, user) => {
  const {
    body: { completed, due_date, responsible_id },
  }: employeeTaskUpdateData = req;
  try {
    const employeeTask = await trakClient.employee_task.findUnique({
      where: {
        id: id.toString(),
      },
    });

    const updatedEmployeeTask = await trakClient.employee_task.update({
      where: {
        id: id.toString(),
      },
      data: {
        completed: completed,
        due_date: due_date,
        responsible: {
          connect: {
            id: responsible_id,
          },
        },
        ...(responsible_id === employeeTask.responsible_id && {
          ...(completed
            ? {
                completed_by: {
                  connect: {
                    id: user.id,
                  },
                },
                completed_date: new Date(),
              }
            : {
                completed_by: {
                  disconnect: true,
                },
                completed_date: null,
              }),
        }),
      },
    });
    res.status(HttpStatusCode.OK).json(updatedEmployeeTask);
  } catch (err) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
