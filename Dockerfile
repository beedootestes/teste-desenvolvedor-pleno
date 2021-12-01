FROM node:latest

WORKDIR /usr/otp

USER root

RUN npm install yarn
 
COPY package.json ./

RUN yarn

RUN yarn typeorm migration:run

COPY . .

EXPOSE 3333

CMD ["yarn","dev"]
