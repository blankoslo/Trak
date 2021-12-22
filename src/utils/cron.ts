import { trakClient } from 'lib/prisma';
import { PrismaClient as BlankClient } from 'prisma/generated/blank';

const addEmployees = async (blankEmployees, includeHrManager = true) => {
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
        ...(employee.hr_manager &&
          includeHrManager && {
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

export async function syncTrakDatabase() {
  const blankClient = new BlankClient();

  // Note: Feels like this is a bit of a odd one, but when we are inserting for the first time we can't set the HR-manager because
  // some of the employees have not been added yet, therefore this either needs to be run twice or some other smart solution ;)
  const isInitialInsert = (await trakClient.employee.count()) === 0;

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
    orderBy: {
      id: 'asc',
    },
  });
  if (isInitialInsert) {
    await addEmployees(blankEmployees, false);
  }
  await addEmployees(blankEmployees);
}
