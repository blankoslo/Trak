![Trak](./public/trak_logo.svg)

[![dev-build-and-deploy](https://github.com/blankoslo/Trak/actions/workflows/deploy.yml/badge.svg)](https://github.com/blankoslo/Trak/actions/workflows/deploy.yml)
![CI](https://img.shields.io/github/license/Zenjjim/Trak)

![Jokes Card](https://readme-jokes.vercel.app/api)

## About Trak

Trak (\ ˈtrack \) is a minimalistic HR system with focus on helping HR getting take care of their employees. Trak's main functionality is keeping trak of both employees and  assignments with automated creation of tasks and constant reminders.
## Documentation
Documentation can be found [here](https://zenjjim.github.io/Trak/)

## Installation
### Prerequisites

- Node 15.6.0 or higher
- Yarn 1.22.10 or higher
- Docker or external PostgreSQL database

### Setup

Start by cloning the project and installing dependencies:
```
git clone https://github.com/Zenjjim/Trak.git
cd Trak
yarn
```

Then create a `.env`-file in root and fill with secrets:
```
TRAK_DB_URL=postgres://postgres:password@localhost:5432/postgres

CRON_SECRET=xxx
JWT_SECRET=xxx

SLACK_TOKEN=xoxb-xxx

GOOGLE_ID=xxx.apps.googleusercontent.com
GOOGLE_SECRET=xxx
```

> Google tokens can be created at [google console](https://console.cloud.google.com/) under _APIs & Services_ > _Credentials_ > _OAuth 2.0 Client IDs_

> (Optional) If using Docker: `DATABASE_URL=postgres://postgres:password@localhost:5432/trak`

(Optional) If using Docker:

```
yarn fresh
```

Database setup:

Seed test or prod database:
```
pg_dump -d "postgres://xxx" > test_seed.sql
```

```
yarn fixtures
```

Finally starting the server:

```
yarn dev
```
