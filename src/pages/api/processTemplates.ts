import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProcessTemplate } from 'utils/types';

/**
 * GET
 * @returns {IProcessTemplate[]} All ProcessTemplates
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const processTemplates = await trakClient.processTemplate.findMany({
      select: {
        slug: true,
        title: true,
      },
    });
    res.json(processTemplates);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
}
