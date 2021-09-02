// https://github.com/prisma/prisma/issues/1983

import { PrismaClient as BlankClient } from 'prisma/generated/blank';
import { PrismaClient as TrakClient } from 'prisma/generated/trak';

export let blankClient;
export let trakClient;

if (process.env.NODE_ENV === `production`) {
  blankClient = new BlankClient();
  trakClient = new TrakClient();
} else {
  if (!global['blank']) {
    global['blank'] = new BlankClient();
  }
  if (!global['trak']) {
    global['trak'] = new TrakClient();
  }

  blankClient = global['blank'];
  trakClient = global['trak'];
}
