import { employee as DbEmployee, employee_settings as DbEmployeeSettings } from '@prisma/client';

import { getEmployees, getEmployment } from './tripletexClient';
import { TripletexEmployee, TripletexEmployeeWithEmploymentDates } from './types';

function toPrismaEmployee(ttEmployee: TripletexEmployeeWithEmploymentDates): DbEmployee {
  return {
    id: ttEmployee.id,
    first_name: ttEmployee.firstName,
    last_name: ttEmployee.lastName,
    birth_date: new Date(ttEmployee.dateOfBirth),
    email: ttEmployee.email,
    date_of_employment: ttEmployee.startDate && new Date(ttEmployee.startDate),
    termination_date: ttEmployee.endDate && new Date(ttEmployee.endDate),
    profession_id: null,
    image_url: null,
    hr_manager_id: null,
    gender: null,
  };
}

function toPrismaEmployeeSettings(ttEmployee: TripletexEmployeeWithEmploymentDates): DbEmployeeSettings {
  return {
    employee_id: ttEmployee.id,
    slack: true,
    delegate: true,
    deadline: true,
    week_before_deadline: true,
    hired: true,
    termination: true,
  };
}

function isEmployeeChanged(oldEmployee: DbEmployee, ttEmployee: TripletexEmployeeWithEmploymentDates): boolean {
  return (
    oldEmployee.first_name !== ttEmployee.firstName ||
    oldEmployee.last_name !== ttEmployee.lastName ||
    oldEmployee.email !== ttEmployee.email ||
    toIsoDateString(oldEmployee.birth_date) !== ttEmployee.dateOfBirth ||
    toIsoDateString(oldEmployee.date_of_employment) !== ttEmployee.startDate ||
    toIsoDateString(oldEmployee.termination_date) !== ttEmployee.endDate
  );
}

function toIsoDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isInactiveEmployee(oldEmployee: DbEmployee): boolean {
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

export async function syncEmployees() {
  const existingEmployees = await trakClient.employee.findMany();

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

  await trakClient
    .$transaction([
      trakClient.employee.createMany({ data: createEmployees.map(toPrismaEmployee) }),
      trakClient.employee_settings.createMany({ data: createEmployees.map(toPrismaEmployeeSettings) }),
    ])
    .catch((err) => console.error(err)); // eslint-disable-line

  await trakClient
    .$transaction(
      updateEmployees.map((updateEmployee) => trakClient.employee.update({ data: toPrismaEmployee(updateEmployee), where: { id: updateEmployee.id } })),
    )
    .catch((err) => console.error(err)); // eslint-disable-line
}
