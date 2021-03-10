// eslint-disable-next-line
const axios = require('axios');

const CRON_SECRET = process.env.CRON_SECRET;
const BASE_URI = 'api/cron/';

axios
  .get(`http://localhost:3000/${BASE_URI}phases`, {
    headers: {
      CRON_SECRET: CRON_SECRET ?? 'secret',
    },
  })
  // eslint-disable-next-line
  .then((res) => console.log(res))
  // eslint-disable-next-line
  .catch((err) => console.log(err.toJSON()));
