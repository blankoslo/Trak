import addDays from 'date-fns/addDays';
import { trakClient } from 'lib/prisma';
import { PrismaClient as BlankClient } from 'prisma/generated/blank';

const updateTask = async (blankEmployees) => {
  const blankEmployeeStartEndDate = blankEmployees.map((employee) => ({
    id: employee.id,
    dateOfEmployment: employee.date_of_employment,
    terminationDate: employee.termination_date,
  }));
  const updatedTrakEmployee = await trakClient.employee.findMany({
    where: {
      NOT: {
        OR: blankEmployeeStartEndDate,
      },
    },
    select: {
      id: true,
      employeeTask: {
        where: {
          task: {
            phase: {
              processTemplate: {
                OR: [{ slug: 'onboarding' }, { slug: 'offboarding' }],
              },
            },
          },
        },
        select: {
          id: true,
          dueDate: true,
          task: {
            select: {
              dueDateDayOffset: true,
              phase: {
                select: {
                  dueDateDayOffset: true,
                  processTemplate: {
                    select: {
                      slug: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  await Promise.all(
    updatedTrakEmployee.map(async (employee) => {
      const blankEmployeeData = blankEmployees.find((blankEmployee) => blankEmployee.id === employee.id);
      if (blankEmployeeData) {
        await updateOrDeleteTask(employee, blankEmployeeData);
      } else {
        await deleteNonExistantUser(employee);
      }
    }),
  );
};
// eslint-disable-next-line
const deleteNonExistantUser = async (employee) =>
  await trakClient.employee.delete({
    where: {
      id: employee.id,
    },
  });

const updateOrDeleteTask = async (employee, blankEmployeeData) =>
  await trakClient.$transaction([
    ...employee.employeeTask.map((task) => {
      const onboardingDateRefrence = task.task.phase.processTemplate.slug === 'onboarding' && blankEmployeeData.date_of_employment;
      const offboardingDateRefrence = task.task.phase.processTemplate.slug === 'offboarding' && blankEmployeeData.termination_date;
      const refrenceDate = onboardingDateRefrence || offboardingDateRefrence || undefined;
      if (!refrenceDate) {
        return trakClient.employeeTask.delete({
          where: {
            id: task.id,
          },
        });
      }
      const taskOffset = task.task.dueDateDayOffset || task.task.phase.dueDateDayOffset;
      const newDueDate = addDays(refrenceDate, taskOffset);
      return trakClient.employeeTask.update({
        where: {
          id: task.id,
        },
        data: {
          dueDate: newDueDate,
        },
      });
    }),
    trakClient.employee.update({
      where: {
        id: employee.id,
      },
      data: {
        dateOfEmployment: blankEmployeeData.date_of_employment,
        terminationDate: blankEmployeeData.termination_date,
      },
    }),
  ]);

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
        gender: employee.gender,
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
      gender: true,
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
  await updateTask(blankEmployees);
  await addEmployees(blankEmployees);
}
