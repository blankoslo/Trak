import addDays from 'date-fns/addDays';
import { trakClient } from 'lib/prisma';

const updateTask = async (blankEmployees) => {
  const blankEmployeeStartEndDate = blankEmployees.map((employee) => ({
    id: employee.id,
    date_of_employment: employee.date_of_employment,
    termination_date: employee.termination_date,
  }));
  const updatedTrakEmployee = await trakClient.employee.findMany({
    where: {
      NOT: {
        OR: blankEmployeeStartEndDate,
      },
    },
    select: {
      id: true,
      employee_tasks: {
        where: {
          task: {
            phase: {
              process_template: {
                OR: [{ slug: 'onboarding' }, { slug: 'offboarding' }],
              },
            },
          },
        },
        select: {
          id: true,
          due_date: true,
          task: {
            select: {
              due_date_day_offset: true,
              phase: {
                select: {
                  due_date_day_offset: true,
                  process_template: {
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
      }
    }),
  );
};

const updateOrDeleteTask = async (employee, blankEmployeeData) =>
  trakClient.$transaction([
    ...employee.employeeTask.map((task) => {
      const onboardingDateRefrence = task.task.phase.process_template_id === 'onboarding' && blankEmployeeData.date_of_employment;
      const offboardingDateRefrence = task.task.phase.process_template_id === 'offboarding' && blankEmployeeData.termination_date;
      const refrenceDate = onboardingDateRefrence || offboardingDateRefrence || undefined;
      if (!refrenceDate) {
        return trakClient.employee_task.delete({
          where: {
            id: task.id,
          },
        });
      }
      const taskOffset = task.task.dueDateDayOffset || task.task.phase.dueDateDayOffset;
      const newDueDate = addDays(refrenceDate, taskOffset);
      return trakClient.employee_task.update({
        where: {
          id: task.id,
        },
        data: {
          due_date: newDueDate,
        },
      });
    }),
    trakClient.employee.update({
      where: {
        id: employee.id,
      },
      data: {
        date_of_employment: blankEmployeeData.date_of_employment,
        termination_date: blankEmployeeData.termination_date,
      },
    }),
  ]);
export async function syncTrakDatabase() {
  const blankEmployees = await trakClient.employee.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      birth_date: true,
      date_of_employment: true,
      gender: true,
      image_url: true,
      //role: true,
      hr_manager: true,
      termination_date: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  await updateTask(blankEmployees);
}
