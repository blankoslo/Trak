import HttpStatusCode from 'http-status-typed';
import { trakClient } from 'lib/prisma';
import withAuth from 'lib/withAuth';
import { toInteger } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withAuth(async function (req: NextApiRequest, res: NextApiResponse, user) {
  const {
    query: { id },
  } = req;
  if (user.id.toString() !== id.toString()) {
    res.status(HttpStatusCode.FORBIDDEN).send({ message: 'Kan kun gjøre endringer på egen bruker' });
  } else if (req.method === 'PUT') {
    PUT(req, res, id);
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end();
  }
});

const PUT = async (req, res, id) => {
  const {
    body: { data },
  } = req;
  try {
    const employeeSettings = await trakClient.employee_settings.update({
      where: {
        employee_id: toInteger(id),
      },
      data: data,
    });
    if (!employeeSettings) {
      throw new Error('Ansattinnstillinger mangler i bodyen');
    }
    res.status(HttpStatusCode.OK).json(employeeSettings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err) {
      res.status(HttpStatusCode.NOT_FOUND).send({ message: err?.meta?.cause });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Noe gikk galt med serveren' });
    }
  }
};
