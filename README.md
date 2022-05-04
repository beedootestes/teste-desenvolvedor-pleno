# Desafio API Perguntas e Respostas BeeDoo

## Proposta
Criar uma API em NodeJS no padrão RestFULL que realizasse as seguintes funções listadas abaixo:

```
    [X] Adicionar uma nova PERGUNTA.
    [X] Listar todas as PERGUNTAS.
    [X] Alterar uma PERGUNTA.
    [X] Deletar uma PERGUNTA.
    [X] Adicionar opções de resposta a uma PERGUNTA. (sem limites)
    [X] Listar todas as opções de RESPOSTAS de uma PERGUNTA.
    [X] Alterar uma opção de RESPOSTA de uma PERGUNTA.
    [X] Deletar uma opção de RESPOSTA de uma PERGUNTA.
```
Para completar o desafio foram utilizadas as seguintes tecnologias:
Banco de Dados: MySQL
Framework: { 
    Sequelize,
    Express
}

## Como usar
Para iniciar o projeto, faça um clone deste repositório, inicialize o projeto utilizando `npm i` ou `(npm install)`
Altere o nome do arquivo `.env.example` para `.env` e caso necessário faça as devidas alterações de acesso nas variaveis de ambiente

Para popular o banco de dados com perguntas e respostas utilize os comandos abaixo na ordem que são mostrados:

`npx sequelize-cli db:create`
`npx sequelize-cli db:migrate`
`npx sequelize-cli db:seed:all`

**juntamente** com a pasta do projeto será disponibilizado o arquivo `Insomnia_2022-05-03.json` que contem todas as requests feitas através do api client insomnia

## Models

Perguntas [ { 
    id: integer, not null, auto increment, primary key,
    pergunta: string, not null
} , . . .]

Respostas[ { 
    id: integer, not null, auto increment, primary key,
    resposta: string, not null,
    resposta_valida: boolean,  not null,
    pergunta_id: integer, not null
} , . . .]

## Rotas

Para este projeto, foram elaborados 2 rotas:
Ambas as rotas utilizam os principais verbos HTTP: GET / POST / PUT / DELETE

```
- /perguntas
    `/` exibe todos as perguntas cadastradas
    `/add` cadastra uma nova pergunta
    `/edit/:id` altera uma pergunta ao informar o `id: number` ao parametro da URL
    `/del/:id` deleta uma pergunta ao informar o `id: number` ao parametro da URL, uma pergunta ao ser deletada, apaga todas as suas respectivas respostas

    exemplo: `localhost:4444/pergunta/add` 
```
```
- /respostas
    `/ ` Exibe todas as perguntas cadastradas no banco de dados

    exemplo: `localhost:4444/resposta` 

    `/?pergunta` onde pergunta é um parametro de `query` que realiza a busca de todas respostas associadas a uma determinada pergunta através do campo `pergunta_id`

    exemplo: `localhost:4444/resposta?pergunta=1` 

    `/add/:id` realiza N cadastros de respostas associadas a uma pergunta, onde `id: number` está diretamente vinculada ao campo `pergunta_id` no ato de sua criação no banco de dados

    exemplo: `localhost:4444/resposta/add/1`

    /edit?pergunta=`id`&resposta=`id` realiza atualização de uma resposta X  `pergunta_id` correspondente a uma pergunta Y, caso o i da pergunta não seja enviado a consulta não é realizada retornando um erro, caso a pergunta seja informada mas não haja respostas associadas a pergunta um erro será retornado ao usuário

    exemplo: `localhost:4444/resposta/edit?pergunta=1&resposta=6`

    /del?pergunta=`id`&resposta=`id` realiza remoçao de uma resposta X  `pergunta_id` correspondente a uma pergunta Y, caso o id da perguntanão seja enviado a consulta não é realizada retornando um erro, caso a pergunta seja informada mas não haja respostas associadas a pergunta um erro será retornado ao usuário

    exemplo: `localhost:4444/resposta/del?pergunta=1&resposta=4`
```

## Dúvidas
Qualquer dúvida/problema referente ao projeto, sinta-se livre para abrir uma issue no projeto que eu responderei o mais breve possível.

## To-Do
[ ] Utilizar docker para comunicação da aplicação nodejs e mysql
[ ] Implementação de testes