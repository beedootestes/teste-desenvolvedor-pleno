#!/bin/bash

cp .env.example .env

npm install
npm run build
npx typeorm migration:run
npm run start:dev
