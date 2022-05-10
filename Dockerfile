# Dockerfile
FROM node:lts

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

COPY package.json ./
COPY yarn.lock ./
COPY src/prisma ./src/prisma/

RUN apt-get -qy update && apt-get -qy install openssl

# install dependencies
RUN yarn install --production --frozen-lockfile

COPY . .

# start app
RUN yarn build
RUN yarn generate
EXPOSE 3000
CMD ["yarn", "start"]
