import axios from 'axios';
import { addDays } from 'date-fns';
import { toIsoDateString } from 'utils/utils';

import { TripletexEmployee, TripletexEmployment } from './types';

interface GetEmployeesResponse {
  values: TripletexEmployee[];
}

interface GetEmploymentResponse {
  value: TripletexEmployment;
}

interface CreateSessionResponse {
  value: {
    token: string;
  };
}

interface Auth {
  sessionToken: string;
  expiryIsoDate: string;
}

let auth: Auth | null = null;

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

async function getAuth(): Promise<string> {
  if (auth === null || toIsoDateString(new Date()) >= auth.expiryIsoDate) {
    const expiryDate = toIsoDateString(addDays(new Date(), 1));
    const url = 'https://tripletex.no/v2/token/session/:create';
    const params = {
      employeeToken: process.env.TRIPLETEX_EMPLOYEE_TOKEN,
      consumerToken: process.env.TRIPLETEX_CONSUMER_TOKEN,
      expirationDate: expiryDate,
    };
    await axios.put<CreateSessionResponse>(url, null, { params }).then((res) => {
      auth = {
        expiryIsoDate: expiryDate,
        sessionToken: res.data.value.token,
      };
    });
  }
  const token = Buffer.from(`0:${auth.sessionToken}`).toString('base64');
  return `Basic ${token}`;
}

export async function getEmployees(): Promise<TripletexEmployee[]> {
  const url = 'https://tripletex.no/v2/employee';
  return axios.get<GetEmployeesResponse>(url, { headers: { Authorization: await getAuth() } }).then((res) => res.data.values.map(strip));
}

export async function getEmployment(id: number): Promise<TripletexEmployment & { rateLimitRemaining: number }> {
  const url = `https://tripletex.no/v2/employee/employment/${id}`;
  return axios.get<GetEmploymentResponse>(url, { headers: { Authorization: await getAuth() } }).then((res) => ({
    id: res.data.value.id,
    startDate: res.data.value.startDate,
    endDate: res.data.value.endDate,
    rateLimitRemaining: Number.parseInt(res.headers['X-Rate-Limit-Remaining']),
  }));
}
