import HttpStatusCode from 'http-status-typed';
import { blankClient, trakClient } from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
    try {
      trakClient.$transaction(
        blankEmployees.map((employee) => {
          return trakClient.employee.create({
            data: {
              id: employee.id,
              firstName: employee.first_name,
              lastName: employee.last_name,
              email: employee.email,
              birthDate: employee.birth_date,
              dateOfEmployment: employee.date_of_employment,
              terminationDate: employee.termination_date,
              imageUrl: employee.image_url,
              Profession: {
                connectOrCreate: {
                  where: {
                    title: employee.role,
                  },
                  create: {
                    title: employee.role,
                  },
                },
              },
            },
          });
        }),
      );
      res.status(HttpStatusCode.OK).end();
    } catch (err) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: err });
    }
  }
}
