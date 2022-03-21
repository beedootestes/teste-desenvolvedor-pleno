FROM node:14
WORKDIR /usr/src/question-node-api
COPY ./package.json .
COPY ./.env .
RUN npm install --only=prod