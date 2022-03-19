const express = require('express');
const app = express();
const cors = require('cors');
const { resolve } = require('path');
const { questionController } = require(resolve('src', 'controllers'));
const port = 3000;

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use('/question', questionController);

app.listen(port, ()=>console.log(`Ambiente rodando na porta ${port}`));