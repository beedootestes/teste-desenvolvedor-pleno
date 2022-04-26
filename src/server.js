const { app } = require("./app");
const { router } = require("./router");
require('dotenv').config();

const PORT = process.env.PORT;

app.use(router);

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}!`));
