// https://github.com/prisma/prisma/issues/1983
import { PrismaClient as TrakClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line
  var trakClient: TrakClient | undefined;
}

export const trakClient = global.trakClient || new TrakClient();

if (process.env.NODE_ENV !== 'production') {
  global.trakClient = trakClient;
}
