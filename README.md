// Configuração do ambiente - início
1 - Clonar repositório;
//O comando abaixo devem ser executados na raiz do projeto clonado
2 - Executar docker build -f node.dockerfile -t eduardomdev/node .
3 - Executar docker network create --driver bridge minha-rede
4 - Executar docker run -d --name mysql --network minha-rede -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=questions_and_answers -e MYSQL_PASSWORD= mysql
5 - Executar docker run -d -p 80:3000 --name node --network minha-rede eduardomdev/node
Obs.: caso dê erro connect econnrefused ao acessar alguma rota, isso acontece porque o serviço do mysql ainda não foi iniciado. Espere alguns minutos, execute os comandos docker stop node, docker rm node, e execute novamente o comando da linha 5

// Configuração do ambiente - fim

// Modo de usar - início
Para acessar as funcionalidades da aplicação, basta fazer requisição http para uma das rotas:
1 - Rota para criar uma nova pergunta:
/question usando o método post, é obrigatório passar no corpo da requisição um json com a chave description (texto equivalente a pergunta) e o valor da chave. Ex.: {"description": "Qual o seu curso?"}

2 - Para buscar todas as perguntas:
/question usando o método get

3 - Para editar uma pergunta:
/question/:id usando o método put, onde o id é o referente a chave primária da questão, e é obrigatório passar no corpo da requisição um json com a chave description (texto equivalente a nova pergunta) e o valor da chave. Ex.: {"description": "Qual o seu nome?"}

4 - Para deletar uma pergunta:
/question/:id usando o método delete, onde o id é o referente a chave primária da questão

5 - Para criar uma resposta para uma determinada pergunta
/question/:questionId/answer usando o método post, onde o questionId é a chave primária da questão, e é obrigatório passar no corpo da requisição um json com a chave description (texto equivalente a resposta da pergunta) e o valor da chave. Ex.: {"description": "Engenharia da Computação"}

6 - Para buscar todas as respostas de uma pergunta
/question/:id/answer usando o método get, onde o id é o referente a chave primária da questão

7 - Para editar uma resposta
/question/:questionId/answer/:answerId usando o método put, onde o questionId é a chave primária da questão e answerId é a chave primária da resposta, e é obrigatório passar no corpo da requisição um json com a chave description (texto equivalente a nova resposta) e o valor da chave. Ex.: {"description": "Eduardo"}

8 - Para deletar uma resposta
/question/:questionId/answer/:answerId usando o método delete, onde o questionId é a chave primária da questão e answerId é a chave primária da resposta

9 - Para buscar todas as perguntas com suas respectivas opções de respostas
/question/answer usando o método get

// Modo de usar - Fim

// Automação de teste - início

1 - Iniciar aplicação
2 - Executar, na raiz da aplicação, o comando npm test. Após executar esse comando, será exibida no console os status dos testes (se foram aprovados ou se teve falha)
Obs.: caso o ambiente de desenvolvimento não esteja no localhost, mudar url base da aplicação na constante urlBase que está no arquivo index.test.js

// Automação de teste - Fim