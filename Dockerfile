FROM node:14

WORKDIR /usr/app

COPY package.json .
COPY tsconfig.json .

COPY ./src ./src
COPY ./etc ./etc

RUN apt-get update && apt-get install nano
RUN yarn install
RUN yarn build

EXPOSE 4202

CMD ["/bin/bash", "/usr/app/etc/cont-init.d/10-config"]
