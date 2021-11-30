import { CreateQuestionController } from '@modules/questions/useCases/CreateQuestion/CreateQuestionController';
import {  Router } from 'express';


const questionRoutes = Router();

const createQuestionController = new CreateQuestionController();


questionRoutes.post("/", createQuestionController.handle);

export {questionRoutes};
