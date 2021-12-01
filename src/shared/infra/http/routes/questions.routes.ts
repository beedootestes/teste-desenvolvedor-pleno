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


questionRoutes.post("/", createQuestionController.handle)
              .get("/", listQuestionsController.handle)
              .patch("/:id", updateQuestionTitleController.handle)
              .delete("/:id", deleteQuestionController.handle);



export {questionRoutes};
