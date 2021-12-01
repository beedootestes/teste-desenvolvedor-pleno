# Backend

Uma REST API com Banco de Dados PostgreSQL.

Toda a aplicação está contida dentro do arquivo `src/common/infra/http/app`
E seus modulos, rotas, controlles e services, estão contidos debaixo da pasta `src`.

`scripts/postgres-docker.sh` faz uma configuração mínima de uma instância PostgreSQL, o RDBMS utilizado no projeto.

`scripts/run-docker-psql.sh` cria os dois DBs utilizados.

Se faz necessário a execução desses scripts ou, apenas ajustar as configurações de conexão com qualquer outra instância Postgres.

## Install

    yarn install

## Criar modelo de dados

    yarn migrate:run

## Executar o app

    yarn run:dev

## Executar os testes

    yarn test

## Endpoints

### Disponíneis e documentados em:

http://localhost:5555/api/docs/#/

Documentados com Swagger, podem ser testados prontamente na url acima com o app executando.