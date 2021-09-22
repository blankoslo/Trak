import HttpStatusCode from 'http-status-typed';
import { blankClient, trakClient } from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const blankEmployees = await blankClient.employees.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          phone: true,
          email: true,
          birth_date: true,
          date_of_employment: true,
          image_url: true,
          role: true,
          termination_date: true,
        },
      });

      const MAGNE = await blankEmployees.find((x) => x.id === 2);
      const magne_connect_or_create = {
        where: {
          id: MAGNE.id,
        },
        create: {
          id: MAGNE.id,
          firstName: MAGNE.first_name,
          lastName: MAGNE.last_name,
          email: MAGNE.email,
          birthDate: MAGNE.birth_date,
          dateOfEmployment: MAGNE.date_of_employment,
          terminationDate: MAGNE.termination_date,
          imageUrl: MAGNE.image_url,
          profession: {
            connectOrCreate: {
              where: {
                title: MAGNE.role,
              },
              create: {
                title: MAGNE.role,
              },
            },
          },
        },
      };

      await trakClient.$transaction(
        blankEmployees.map((employee) => {
          const data = {
            firstName: employee.first_name,
            lastName: employee.last_name,
            email: employee.email,
            birthDate: employee.birth_date,
            dateOfEmployment: employee.date_of_employment,
            terminationDate: employee.termination_date,
            imageUrl: employee.image_url,
            hrManager: {
              connectOrCreate: magne_connect_or_create,
            },
            profession: {
              connectOrCreate: {
                where: {
                  title: employee.role,
                },
                create: {
                  title: employee.role,
                },
              },
            },
          };

          return trakClient.employee.upsert({
            where: {
              id: employee.id,
            },
            update: data,
            create: {
              id: employee.id,
              ...data,
            },
          });
        }),
      );

      res.status(HttpStatusCode.OK).end();
    } catch (err) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: err });
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
