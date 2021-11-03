import { blankClient, trakClient } from 'lib/prisma';

export const syncTrakDatabase = async () => {
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
      hr_manager: true,
      termination_date: true,
    },
  });

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
        ...(employee.hr_manager && {
          hrManager: {
            connect: {
              id: employee.hr_manager,
            },
          },
        }),
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
};
