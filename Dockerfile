FROM node:17
WORKDIR /usr/src/test-dev
COPY ./package.json .
RUN npm install --only=prod
