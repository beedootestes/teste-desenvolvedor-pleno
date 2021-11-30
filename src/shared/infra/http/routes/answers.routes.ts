import { CreateQuestionController } from '@modules/questions/useCases/CreateQuestion/CreateQuestionController';
import { DeleteQuestionController } from '@modules/questions/useCases/DeleteQuestion/DeleteQuestionController';
import { ListQuestionsController } from '@modules/questions/useCases/ListQuestions/ListQuestionsController';
import { UpdateQuestionTitleController } from '@modules/questions/useCases/UpdateQuestionTitle/UpdateQuestionTitleContoller';
import {  Router } from 'express';


const questionRoutes = Router();

const createQuestionController = new CreateQuestionController();
const updateQuestionTitleController = new UpdateQuestionTitleController();
const listQuestionsController = new ListQuestionsController();
const deleteQuestionController = new DeleteQuestionController();


questionRoutes.post("/", createQuestionController.handle);
questionRoutes.get("/", listQuestionsController.handle);
questionRoutes.put("/:id", updateQuestionTitleController.handle);
questionRoutes.delete("/:id", deleteQuestionController.handle);



export {questionRoutes};
