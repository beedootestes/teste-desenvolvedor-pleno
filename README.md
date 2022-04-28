## Teste Víctor Gontijo Cançado para Beedoo

#Como usar

- Faça um clone do projeto. 
- Crie um arquivo .env e defina as varáveis de ambiente MYSQL_USER e MYSQL_PASSWORD com seu usuário e senha do MySQL respectivamente.
- Crie uma DATABASE chamada crud e as tabelas question e answers no MySQL com o seguinte código:
      CREATE DATABASE crud; 
      USE crud;
      CREATE TABLE questions(
      question_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
      question VARCHAR(255) NOT NULL
      );
      CREATE TABLE answers(
      answer_id INT PRIMARY KEY AUTO_INCREMENT, 
      question_id INT NOT NULL, 
      answer VARCHAR(255) NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions(question_id)
      );
      
- Em seguida na pasta raiz dê um npm start. Utilize o Postman ou o Insomnia para fazer as requisições.


