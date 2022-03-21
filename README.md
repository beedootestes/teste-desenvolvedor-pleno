# Questions
Uma API REST para criar perguntas e respostas.
### Instalação e execução

1 - Configuração do ambiente para desenvolvimento e executação:

- [Node.js](https://nodejs.org/) v12+
- [Docker](https://docs.docker.com/get-docker/)  para gerenciamento dos 
containers
- [Docker Compose](https://docs.docker.com/compose/install/)

2 - Clone este repositório

3 - Instale todas as dependências de produção e desenvolvimento e execute .

```sh
npm i
npm run up
```
A API estará disponível em http://localhost:5050/api

### Documentação

Para saber como montar suas consultas, acesse a documentação em [Postman](https://documenter.getpostman.com/view/18794338/UVsQsiww).

## Testes de integração

```sh
npm run teste:integration
```
### DER
Representação do relacionamento entre as entidades

![image](https://user-images.githubusercontent.com/46679203/159347834-fe9151cd-7231-4e81-9a62-b5d423e10b14.png)