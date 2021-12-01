import { CreateQuestionController } from '@modules/useCases/CreateQuestion/CreateQuestionController';
import { DeleteQuestionController } from '@modules/useCases/DeleteQuestion/DeleteQuestionController';
import { ListQuestionsController } from '@modules/useCases/ListQuestions/ListQuestionsController';
import { UpdateQuestionTitleController } from '@modules/useCases/UpdateQuestionTitle/UpdateQuestionTitleContoller';
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
