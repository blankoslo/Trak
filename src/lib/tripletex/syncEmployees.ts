import { employee } from '@prisma/client';

import { getEmployees } from './tripletexClient';
import { TripletexEmployee } from './types';

function toPrismaEmployee(ttEmployee: TripletexEmployee): employee {
  return {
    id: ttEmployee.id,
    first_name: ttEmployee.firstName,
    last_name: ttEmployee.lastName,
    birth_date: new Date(ttEmployee.dateOfBirth),
    email: ttEmployee.email,
    gender: null,
    date_of_employment: null,
    profession_id: null,
    termination_date: null,
    image_url: null,
    hr_manager_id: null,
  };
}

export async function syncEmployees() {
  const existingEmployees = await trakClient.employee.findMany();

  const updatedEmployees = await getEmployees();

  const newEmployees = updatedEmployees
    .filter((newEmployee) => newEmployee.email.length > 0)
    .filter((newEmployee) => !existingEmployees.some((existingEmployee) => existingEmployee.email === newEmployee.email))
    .map(toPrismaEmployee);

  // eslint-disable-next-line
  trakClient.employee.createMany({ data: newEmployees }).catch((err) => console.error(err));
}
