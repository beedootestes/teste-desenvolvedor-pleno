import { Router } from 'express';

import SentenceController from '@modules/sentence/infra/http/controllers/SentenceController';

const sentenceRouter = Router();
const sentenceController = new SentenceController();

sentenceRouter.post('/', sentenceController.create);
sentenceRouter.post('/list', sentenceController.list);
sentenceRouter.get('/:sentenceId', sentenceController.getById);
sentenceRouter.patch('/:sentenceId', sentenceController.update);
sentenceRouter.patch('/:sentenceId/reactivate', sentenceController.reactivate);
sentenceRouter.delete('/:sentenceId', sentenceController.delete);

export default sentenceRouter;
