const app = require('express')();
const router = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

module.exports = app;
