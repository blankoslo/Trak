import axios from 'axios';

import { TripletexEmployee } from './types';

interface GetEmployeesResponse {
  values: TripletexEmployee[];
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

export async function getEmployees(): Promise<TripletexEmployee[]> {
  const url = 'https://tripletex.no/v2/employee';
  const basicAuth = Buffer.from(`0:${process.env.TRIPLETEX_SESSION_TOKEN}`).toString('base64');
  return axios.get<GetEmployeesResponse>(url, { headers: { Authorization: `Basic ${basicAuth}` } }).then((res) => res.data.values.map(strip));
}
