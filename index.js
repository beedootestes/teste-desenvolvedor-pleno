const express = require('express');
const router = require('./controllers/routers');
const error = require('./utils/error');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/', router);
app.use(error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

module.exports = app;
