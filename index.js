require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const questionController = require('./controllers/questionController');

app.use(bodyParser.json());
app.use('/questions', questionController);

app.listen(process.env.PORT, () => console.log(`Ouvindo na porta ${process.env.PORT}`));
