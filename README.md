# API de Perguntas e Respostas

API desenvolvidada para teste de Dev Back-end na empresa Beedoo

# Baixando o projeto

Faça um fork do repositório: `https://github.com/beedootestes/teste-desenvolvedor-pleno`

Entre na pasta do projeto:

```
cd teste-desenvolvedor-pleno
```

Mude para a branch 
``marianagarcia``

Instale as dependências: 
```
npm i -D nodemon body-parser express express-rescue dotenv mysql2
```
## Configurando variáveis de ambiente:
Você irá encontar um arquivo chamado `.env.example` configurado da seguinte forma:

```
MYSQL_USER=
MYSQL_HOSTNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=
PORT=
```
Preencha as informações seguindo o modelo:

```
MYSQL_USER=user //usuario de BD
MYSQL_HOSTNAME=hostname //nome do host
MYSQL_PASSWORD=sua_senha_do_database
MYSQL_DATABASE=beedoo //NÃO ALTERAR ESSE CAMPO
PORT=8080 //porta onde aplicação irá rodar
```
# Rodando a aplicação
- Utilize a query no arquivo beedoo.sql para criar o banco de dados utilizado na aplicação;
- Após criar o banco de dados, utilize o comando ``npm run dev`` no terminal para iniciar o servidor


### Para acessar todas as perguntas:
```
Fazer uma requisição GET para
localhost:3000/questions
```
### Para acessar todas as perguntas com opções de resposta:
```
Fazer uma requisição GET para
localhost:3000/questions/QandA
```

### Para criar uma pergunta

```
Fazer uma requisição POST para 
localhost:3000/questions
```
Inserir no corpo da requisição a nova pergunta:
```
{
  "question": "criando uma nova pergunta"
}
```

### Para atualizar uma pergunta:
```
Fazer uma requisição PUT para:
localhost:3000/questions/id
```
Sendo "id", o id da questão a ser atualizada.

Escrever no corpo da requisição o campo a ser atualizado:
```
{
  "question": "atualizando a pergunta"
}
```

### Para buscar uma pergunta através do id com suas opções de resposta:

```
Fazer uma requisição GET para
localhost:3000/questions/id
```
Sendo "id", o id da pergunta a ser buscada.

Exemplo:
```
localhost:3000/questions/1

// corpo da requisição

{
  "question": "Qual o maior mamífero terrestre?"
}

// resultado:
{
  "id": "1",
  "question": "Qual o maior mamífero terrestre?"
}
```

### Excluindo uma pergunta:

```
Fazer uma requisição DELETE para 
localhost:3000/questions/id
```
Sendo o "id", o id da questão a ser excluída.

### Para acessar todas as respostas:
```
Fazer uma requisição GET para
localhost:3000/answers
```
### Para atualizar as opções de resposta:

```
Fazer uma requisição PUT para 
localhost:3000/answers/id
```
Sendo "id", o id da resposta a ser atualizada.