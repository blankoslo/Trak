FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as build
RUN export NODE_ENV=production
RUN yarn install --network-timeout 100000

COPY . .
RUN yarn prisma generate
RUN yarn build

FROM base as prod-build

RUN yarn install --production --network-timeout 100000
COPY src/prisma src/prisma
RUN yarn prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/src/prisma /app/src/prisma

EXPOSE 3000
CMD ["yarn", "start"]