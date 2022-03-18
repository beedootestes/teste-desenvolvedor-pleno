FROM node:14.17.6
MAINTAINER Eduardo Marcelino da Silva
ENV ENV=production
ENV PORT=3000
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE $PORT