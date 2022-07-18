import { employee as TrakDbEmployee } from '@prisma/client';
import { UpstreamEmployeeSync, UpstreamSyncClient } from 'lib/upstreamSync';
import { toIsoDateString } from 'utils/utils';

import { getEmployees, getEmployment } from './tripletexClient';
import { TripletexEmployee, TripletexEmployeeWithEmploymentDates } from './types';

function toTrakEmployee(ttEmployee: TripletexEmployeeWithEmploymentDates): TrakDbEmployee {
  return {
    id: ttEmployee.id,
    first_name: ttEmployee.firstName,
    last_name: ttEmployee.lastName,
    birth_date: new Date(ttEmployee.dateOfBirth),
    email: ttEmployee.email,
    date_of_employment: ttEmployee.startDate && new Date(ttEmployee.startDate),
    termination_date: ttEmployee.endDate && new Date(ttEmployee.endDate),
    profession_id: undefined,
    image_url: undefined,
    hr_manager_id: undefined,
    gender: undefined,
  };
}

function isEmployeeChanged(oldEmployee: TrakDbEmployee, ttEmployee: TripletexEmployeeWithEmploymentDates): boolean {
  return (
    oldEmployee.first_name !== ttEmployee.firstName ||
    oldEmployee.last_name !== ttEmployee.lastName ||
    oldEmployee.email !== ttEmployee.email ||
    toIsoDateString(oldEmployee.birth_date) !== ttEmployee.dateOfBirth ||
    toIsoDateString(oldEmployee.date_of_employment) !== ttEmployee.startDate ||
    toIsoDateString(oldEmployee.termination_date) !== ttEmployee.endDate
  );
}

function isInactiveEmployee(oldEmployee: TrakDbEmployee): boolean {
  return oldEmployee.termination_date && oldEmployee.termination_date < new Date();
}

async function getEmployeeWithEmploymentDates(ttEmployee: TripletexEmployee): Promise<TripletexEmployeeWithEmploymentDates> {
  const employments = ttEmployee.employments;
  employments.sort();
  employments.reverse();
  const employmentId = employments[0].id;

  const employment = await getEmployment(employmentId);

  // Sleep 1 sec if we have less than 50 request remaining to ensure we don't get rate limited.
  if (employment.rateLimitRemaining < 50) {
    await new Promise((r) => setTimeout(r, 1000));
  }

  return {
    ...ttEmployee,
    startDate: employment.startDate,
    endDate: employment.endDate,
  };
}

async function getUpstreamEmployees(existingEmployees: TrakDbEmployee[]): Promise<UpstreamEmployeeSync> {
  const inactiveEmployees = new Set(existingEmployees.filter(isInactiveEmployee).map((employee) => employee.id));
  const existingEmployeeIds = new Set(existingEmployees.map((employee) => employee.id));

  const upstreamEmployees = await getEmployees();

  const filteredEmployees = upstreamEmployees
    .filter((newEmployee) => newEmployee.email.length > 0)
    .filter((newEmployee) => !inactiveEmployees.has(newEmployee.id));

  const employeesWithDates: TripletexEmployeeWithEmploymentDates[] = [];

  for (const employee of filteredEmployees) {
    const employeeWithDates = await getEmployeeWithEmploymentDates(employee);
    employeesWithDates.push(employeeWithDates);
  }

  const createEmployees = employeesWithDates.filter((employee) => !existingEmployeeIds.has(employee.id));
  const updateEmployees = employeesWithDates
    .filter((employee) => existingEmployeeIds.has(employee.id))
    .filter((employee) => {
      const oldEmployee = existingEmployees.find((oldEmployee) => employee.id === oldEmployee.id);
      return isEmployeeChanged(oldEmployee, employee);
    });

  return {
    createEmployees: createEmployees.map(toTrakEmployee),
    updateEmployees: updateEmployees.map(toTrakEmployee),
  };
}

const tripletexSyncClient: UpstreamSyncClient = {
  getUpstreamEmployees,
};

export default tripletexSyncClient;
