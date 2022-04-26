// Utilizei como fonte de como criar um CRUD sem ORM o seguinte tutorial: 
// https://www.luiztools.com.br/post/como-usar-nodejs-mysql/

require('dotenv').config();

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(`mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@localhost:3306/crud`);
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

module.exports.connect = connect;