

# API de perguntas

API desenvolvida para servir uma aplicação com perguntas e respostas.

## Stack utilizada

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

* Express
* Sequelize - MySql
* Nodejs
* Docker
* Testes de integração com:
  - mocha
  - chai
  - sinon

---

## Instalação

1 - Clone o projeto para o seu compotador e em seguida instale as depências utilizando o npm:

* Clone o projeto para algum diretório do seu computador;
* Acesse o diretório do projeto que acabou de clonar;
* Em seguida instale as depências executando o seguinte comando;

```
  npm install
```

2 - Agora vamos subir o projeto em containers do **Docker**:

* Execute no seu terminal o seguinte comando do script do projeto;

```
npm run compose:up
```
> Aguarde a execução do comando.

3 - Após subir os containers do docker, precisamos criar o **DB** para rodar a aplicação:

* Precisamos acessar o **sh** do container do backend para criar o **DB** usando os comando do sequelize;
* Execute o seguinte comando no terminal, para acessar o **sh** do container;

```
docker exec -it backend sh
```

Seu terminal devera estar semelhante a esse:

```
/app # 
```

* Agora precisamos executar os comando para criação do **DB**;
* Execute o seguinte comando do sequelize no seu terminal;

```
npx sequelize db:create
```
> Aguarde a execução do comando.

- Você deve ter um retorno no terminal semelhante a esse:

```
/app # npx sequelize db:create

Sequelize CLI [Node: 16.14.2, CLI: 6.4.1, ORM: 6.19.0]

Loaded configuration file "src/config/config.js".
Using environment "development".
Database questions_api created.
```

* Agora execute o seguinte comando do sequelize para criar as **tabelas** no **DB**;

```
npx sequelize db:migrate
```
> Aguarde a execução do comando.

- Você deve ter um retorno no terminal semelhante a esse:

```
/app # npx sequelize db:migrate

Sequelize CLI [Node: 16.14.2, CLI: 6.4.1, ORM: 6.19.0]

Loaded configuration file "src/config/config.js".
Using environment "development".
== 20220419192534-create-question: migrating =======
== 20220419192534-create-question: migrated (0.058s)

== 20220419192548-create-answer: migrating =======
== 20220419192548-create-answer: migrated (0.052s)
```

### Opcional
## Para popular o DB com dados pré criados.

* Execute o seguinte comando do sequelize ainda dentro do container para popular o **DB**;

```
npx sequelize db:seed:all
```
> Aguarde a execução do comando.

- Você deve ter um retorno no terminal semelhante a esse:

```
/app # npx sequelize db:seed:all

Sequelize CLI [Node: 16.14.2, CLI: 6.4.1, ORM: 6.19.0]

Loaded configuration file "src/config/config.js".
Using environment "development".
== 20220419191721-questions: migrating =======
== 20220419191721-questions: migrated (0.021s)

== 20220419191745-answers: migrating =======
== 20220419191745-answers: migrated (0.012s)
```

* Agora com **DB** criado é só sair do **sh** do container executando o seguinte comando;

```
exit
```

* Agora é só usar o navegador para acessar as rotas:

Expemplo:

Rota `GET /questions`

Acesse a seguinte rota na barrade endereços do seu navegador:

```
http://localhost:3001/questions
```

---

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```
  npm test
```

---

## Deinstalação

* Para para e remover os containers, execute o seguinte comando no do script do projeto:

```
npm run compose:down
```
> Aguarde a execução do comando.

- Você deve ter um retorno no terminal semelhante a esse:

```
> teste-desenvolvedor-pleno@1.0.0 compose:down
> docker-compose down --remove-orphans

Stopping backend ... done
Stopping db      ... done
Removing backend ... done
Removing db      ... done
Removing network teste-desenvolvedor-pleno_default
```
Dessa forma os containers serão parados e em seguida removidos.

## Referência

- [Cheat sheet docker-compose](https://dockerlabs.collabnix.com/docker/cheatsheet/)

- [Sequelize Models](https://sequelize.org/docs/v6/core-concepts/model-basics/)

- [Sequelize migrations e seeds](https://sequelize.org/docs/v6/other-topics/migrations/)

- [Sequelize setup cheat sheet](https://github.com/tryber/Trybe-CheatSheets/tree/master/backend/sequelize/setup)

- [docker-compose up](https://docs.docker.com/compose/reference/up/)

- [docker-compose down](https://docs.docker.com/compose/reference/down/)

- [Padrões de commits](https://github.com/iuricode/padroes-de-commits)

- [Markdown](https://pt.wikipedia.org/wiki/Markdown);

- [Markdown github cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet);
