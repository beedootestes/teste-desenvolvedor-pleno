<h1 align="center">
  <br />
  <a href="https://www.linkedin.com/in/matheus-teodoro-7bb92818a/">
  </a>
</h1>
<p align="center">
  <a href="#page_facing_up-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#clipboard-Funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#closed_book-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :page_facing_up: Descrição

Os usuários dessa aplicação, poderão visualizar uma pergunta e suas respectivas respostas,
além de criar novas perguntas e respostas, bem como realizar a edição de qualquer perguntas
ou resposta e deletá-las também.


## 🛠 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

### App

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Heroku](https://www.heroku.com/home)


### Banco de Dados

- O Banco de dados dessa aplicação é o ClearDB MySQL ofrecido pela plataforma de hospedagem online Heroku.


## :clipboard: Funcionalidades

  - [x] Criar perguntas.
  - [x] Listar todas as perguntas.
  - [x] Editar uma pergunta.
  - [x] Deletar uma pergunta.
  - [x] Adicionar opções de resposta a uma pergunta (sem limites).
  - [x] Listar todas as opções de respostas de uma pergunta.
  - [x] Alterar uma opção de resposta de uma pergunta.
  - [x] Deletar uma opção de resposta de uma pergunta.

## :closed_book: Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker](https://www.docker.com/) instalado e um navegador para visualizar as perguntas e respostas que já estão cadastradas.
Caso queira inserir mais perguntas ou respostas, editá-las ou deletá-las utilize um testadir de API's como o 
[Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download).


```bash
# Clone o repositório com um dos links abaixo;
$ git clone git@github.com:douglas-santana/teste-desenvolvedor-pleno.git
$ git clone https://github.com/douglas-santana/teste-desenvolvedor-pleno.git

# Você terá duas opções de uso dessa API:
$ Via Docker ou Heroku

# Via Docker, instale as dependências:
$ npm install

# Execute aplicação:
$ npm run docker

```

- Para consumir a API no navegador mesmo digite o endereço abaixo:
  - https://localhost:3001 para a página inicial da API.
  - https://localhost:3001/questions para mostrar todas as perguntas cadastradas.
  - https://localhost:3001/questions/'id_da_pergunta' para mostrar uma pergunta.
  - https://localhost:3001/answers para mostrar todas as respostas cadastradas.
  - https://localhost:3001/answers/'id_da_reposta' para mostrar uma resposta.
  - https://localhost:3001/answersquestions/'id_da_pergunta' para mostar uma pergunta e suas respostas.
- Para inserir, atualizar ou deletar utilize o postman ou insomnia e digite o endereço abaixo:
  - POST https://localhost:3001/questions para criar uma pergunta é preciso digitar no body da requisição: { "question": "..." }.
  - PUT https://localhost:3001/questions/id para editar uma pergunta: { "question": "..." }.
  - DELETE https://localhost:3001/questions/id para excluir uma pergunta conforme id.
  - POST https://localhost:3001/answers para criar repostas: [{ "answer": "...", "questionId": "Id_da_pergunta"}, {...}].
  - PUT https://localhost:3001/answers/id para editar uma resposta: { "answer": "..."}.
  - DELETE https://localhost:3001/answers/id para excluir uma resposta conforme id.

## :clipboard: Como utilizar via Heroku (núvem):
- Para consumir a API no navegador mesmo digite o endereço abaixo:
  - https://teste-desenvolvedor-pleno.herokuapp.com/ para a página inicial da API.
  - https://teste-desenvolvedor-pleno.herokuapp.com/questions para mostrar todas as perguntas cadastradas.
  - https://teste-desenvolvedor-pleno.herokuapp.com/'id_da_pergunta' para mostrar uma pergunta.
  - https://teste-desenvolvedor-pleno.herokuapp.com/answers para mostrar todas as respostas cadastradas.
  - https://teste-desenvolvedor-pleno.herokuapp.com/'id_da_reposta' para mostrar uma resposta.
  - https://teste-desenvolvedor-pleno.herokuapp.com/'id_da_pergunta' para mostar uma pergunta e suas respostas.
- Para inserir, atualizar ou deletar utilize o postman ou insomnia só mude a url inicial.

---
## Implementações Futuras:
  - Criar o Front.

---
Feito com ❤️ por Douglas Santana 🚀
- [Linkedin](https://www.linkedin.com/in/douglasdns/)
- [YouTube](https://youtu.be/8dmJ-X7inAM)

