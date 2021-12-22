// https://github.com/prisma/prisma/issues/1983

import { Prisma } from 'prisma';
import { PrismaClient as TrakClient } from 'prisma/generated/trak';

export let trakClient: TrakClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

if (process.env.NODE_ENV === `production`) {
  trakClient = new TrakClient();
} else {
  if (!global['trak']) {
    global['trak'] = new TrakClient();
  }

  trakClient = global['trak'];
}
