# BeedooChallenge

### **Documentação da API**:

_base url_ : `http://localhost:8080/`

1. npm install ou yarn para instalar todas depêndencias
2. Crie um banco de dados beedoo_chalenge em MySQL
3. Importe e exececute dentro desse Banco de dados O fichiero localizado em `src/dump/beedoo_challenge.sql`
4. Dentro do directorio `src/insomnia/insomnia.json`
   Importe esse ficheiro lá no insominia do seu computador
5. No terminal rode: `yarn dev` ou `npm run dev`
6. Testar as rotas no insomnia

### **Rodando no Docker**

Basta abrir o terminal no diretorio do projecto e rodar o seguinte:

1.  `docker-compose build/sudo docker-compose build` - no windows/Linux
2.  `docker-compose up -d/sudo docker-compose up -d` - Para rodar o container em backGround
3.  Rode um `docker ps/sudo docker ps` - Para verificar se os containers estão rodando
4.  sudo docker run **nome da imagem**
5.  Teste os EndPoints

## **Tecnologias/Ferramentas usadas**

- NodeJs
- TypeScript
- MySQL
- typeorm
- docker
- Lint
- Prettier
- Insomnia

_By: luiscaputo_
