import { CreateAnswerController } from '@modules/questions/useCases/CreateAnswer/CreateAnswerController';
import { DeleteAnswerController } from '@modules/questions/useCases/DeleteAnswer/DeleteAnswerController';
import { ListAnswersByQuestionIdController } from '@modules/questions/useCases/ListAnswersByQuestionId/ListAnswersByQuestionIdController';
import { UpdateAnswerTitleController } from '@modules/questions/useCases/UpdateAnswerTitle/UpdateAnswerTitleController';
import {  Router } from 'express';

const answersRoutes = Router();

const createAnswerController = new CreateAnswerController();
const updateAnswerTitleController = new UpdateAnswerTitleController();
const deleteAnswerController = new DeleteAnswerController();
const listAnswersByQuestionIdController = new ListAnswersByQuestionIdController();


answersRoutes.post("/:question_id", createAnswerController.handle)
             .get("/:question_id", listAnswersByQuestionIdController.handle)
             .patch("/:id", updateAnswerTitleController.handle)
             .delete("/:id", deleteAnswerController.handle);



export {answersRoutes};
