🚀 Technologies:
This back-end project was developed using the following technologies:

Typescript
Node.js
TypeORM
Docker
PostgreSQL
JEST
Supertest

👷 How to use: 
To clone and run this API you will need the following software installed on your computer:

Git
Node
Yarn
Docker

🔌 Install dependencies and run the application:
# Clone this repository:
$ git clone https://github.com/KevenJunco/teste-desenvolvedor-pleno.git

# Enter the repository:
$ cd teste-desenvolvedor-pleno

# Install the dependencies:
$ yarn

# Create the app containers:
$ docker-compose up -d --build

# Make a copy of the file "ormconfig.example.json" with the name "ormconfig.json":
# Fill in the correct data to be able to connect to the database
$ cp ormconfig.example.json ormconfig.json

# Make a copy of the ".env.example" file with the name ".env":
$ cp .env.example .env

# Run the migrations:
$ yarn typeorm migration:run

# Start the application
$ yarn dev

# The server is running at port 3333 (http://localhost:3333/)

# To stop the database:
$ docker-compose stop

🧪 Run the tests:
# To run all tests:
$ yarn test


📚 Documentation:
All API endpoints have been documented using Swagger. To view just access the URL below or click on this link.
Remember to start the server first

Local: http://localhost:3333/api-docs


📌 Project requeriments:
All rules for this API can be found on this link.


Made with 💙 by Keven Junco 