require('dotenv').config();
const express = require('express');
const { StatusCodes } = require('http-status-codes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  return res.status(StatusCodes.OK).send('Funcionando');
});

app.listen(PORT, () => {
  console.log(`Ouvindo na porta: ${PORT}`);
});