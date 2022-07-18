// https://github.com/prisma/prisma/issues/1983
import { employee as TrakDbEmployee } from '@prisma/client';
import { UpstreamEmployeeSync, UpstreamSyncClient } from 'lib/upstreamSync';
import { employees as BlankDbEmployee, PrismaClient as BlankClient } from 'prisma/generated/blank';

declare global {
  // eslint-disable-next-line
  var blankClient: BlankClient | undefined;
}

export const blankClient = global.blankClient || new BlankClient();

if (process.env.NODE_ENV !== 'production') {
  global.blankClient = blankClient;
}

async function getEmployees() {
  return blankClient.employees.findMany();
}

function toTrakEmployee(blankEmployee: BlankDbEmployee): TrakDbEmployee {
  return {
    id: blankEmployee.id,
    first_name: blankEmployee.first_name,
    last_name: blankEmployee.last_name,
    birth_date: blankEmployee.birth_date,
    email: blankEmployee.email,
    date_of_employment: blankEmployee.date_of_employment,
    termination_date: blankEmployee.termination_date,
    profession_id: blankEmployee.profession_id,
    image_url: blankEmployee.image_url,
    hr_manager_id: blankEmployee.hr_manager_id,
    gender: blankEmployee.gender,
  };
}

async function getUpstreamEmployees(existingEmployees: TrakDbEmployee[]): Promise<UpstreamEmployeeSync> {
  const existingEmployeeIds = new Set(existingEmployees.map((employee) => employee.id));

  const upstreamEmployees = await getEmployees();

  const createEmployees = upstreamEmployees.filter((employee) => !existingEmployeeIds.has(employee.id));
  const updateEmployees = upstreamEmployees.filter((employee) => existingEmployeeIds.has(employee.id));

  return {
    createEmployees: createEmployees.map(toTrakEmployee),
    updateEmployees: updateEmployees.map(toTrakEmployee),
  };
}

const blankSyncClient: UpstreamSyncClient = {
  getUpstreamEmployees,
};

export default blankSyncClient;
