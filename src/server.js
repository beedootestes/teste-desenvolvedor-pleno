const { app } = require("./app");
require('dotenv').config();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome. Acess: https://github.com/douglas-santana/teste-desenvolvedor-pleno for how to use!"
  })
});

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}!`));
