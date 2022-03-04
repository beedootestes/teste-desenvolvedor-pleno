FROM node:17
WORKDIR /usr/src/test-dev
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start