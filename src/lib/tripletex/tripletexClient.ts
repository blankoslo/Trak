import axios from 'axios';

import { TripletexEmployee, TripletexEmployment } from './types';

interface GetEmployeesResponse {
  values: TripletexEmployee[];
}

interface GetEmploymentResponse {
  value: TripletexEmployment;
}

/*
 * Strip fields we don't need from the tripletex response, as they might contain sensitive information.
 */
function strip(employee: TripletexEmployee): TripletexEmployee {
  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    displayName: employee.displayName,
    dateOfBirth: employee.dateOfBirth,
    email: employee.email,
    employments: employee.employments,
  };
}

function getAuth(): string {
  const token = Buffer.from(`0:${process.env.TRIPLETEX_SESSION_TOKEN}`).toString('base64');
  return `Basic ${token}`;
}

export async function getEmployees(): Promise<TripletexEmployee[]> {
  const url = 'https://tripletex.no/v2/employee';
  return axios.get<GetEmployeesResponse>(url, { headers: { Authorization: getAuth() } }).then((res) => res.data.values.map(strip));
}

export async function getEmployment(id: number): Promise<TripletexEmployment & { rateLimitRemaining: number }> {
  const url = `https://tripletex.no/v2/employee/employment/${id}`;
  return axios.get<GetEmploymentResponse>(url, { headers: { Authorization: getAuth() } }).then((res) => ({
    id: res.data.value.id,
    startDate: res.data.value.startDate,
    endDate: res.data.value.endDate,
    rateLimitRemaining: Number.parseInt(res.headers['X-Rate-Limit-Remaining']),
  }));
}
