import { employee as DbEmployee } from '@prisma/client';

import tripletexSyncClient from './tripletex/tripletexSyncClient';

export interface UpstreamSyncClient {
  getUpstreamEmployees: (existingEmployees: DbEmployee[]) => Promise<UpstreamEmployeeSync>;
}

export type UpstreamEmployeeSync = {
  updateEmployees: DbEmployee[];
  createEmployees: DbEmployee[];
};

const syncClient: UpstreamSyncClient = tripletexSyncClient;

function getDefaultEmployeeSettings(employee: DbEmployee) {
  return {
    employee_id: employee.id,
    slack: true,
    delegate: true,
    deadline: true,
    week_before_deadline: true,
    hired: true,
    termination: true,
  };
}

async function syncEmployees() {
  const existingEmployees = await trakClient.employee.findMany();

  const { createEmployees, updateEmployees } = await syncClient.getUpstreamEmployees(existingEmployees);

  await trakClient
    .$transaction([
      trakClient.employee.createMany({ data: createEmployees }),
      trakClient.employee_settings.createMany({
        data: createEmployees.map(getDefaultEmployeeSettings),
      }),
    ])
    .catch((err) => console.error(err)); // eslint-disable-line

  await trakClient
    .$transaction(updateEmployees.map((updateEmployee) => trakClient.employee.update({ data: updateEmployee, where: { id: updateEmployee.id } })))
    .catch((err) => console.error(err)); // eslint-disable-line
}

export async function syncTrakWithUpstream() {
  syncEmployees();
}
