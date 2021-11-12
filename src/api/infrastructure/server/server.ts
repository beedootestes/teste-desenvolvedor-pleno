import express from 'express';
import cors from 'cors';
import routes from '../routes/routes';

export default async function createServer(){

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
}