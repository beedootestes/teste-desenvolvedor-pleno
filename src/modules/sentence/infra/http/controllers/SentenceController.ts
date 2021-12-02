import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import AppError from '@common/errors/AppError';
import AppContainer from '@common/container';

// Services
import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import GetSentenceByIdService from '@modules/sentence/services/GetSentenceByIdService';
import ListSentencesService from '@modules/sentence/services/ListSentencesService';
import UpdateSentenceService from '@modules/sentence/services/UpdateSentenceService';
import DeleteSentenceService from '@modules/sentence/services/DeleteSentenceService';
import ReactivateSentenceService from '@modules/sentence/services/ReactivateSentenceService';

// Validators
import CreateSentenceSchema from '@modules/sentence/infra/http/validators/CreateSentenceValidator';
import UpdateSentenceSchema from '@modules/sentence/infra/http/validators/UpdateSentenceValidator';
import ListSentenceSchema from '@modules/sentence/infra/http/validators/ListSentenceValidator';

class SentenceController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try { CreateSentenceSchema.parse(data); } catch (err) {
      throw new AppError('Validation error in request body', 400, null, err.errors);
    }

    const createSentence = AppContainer.resolve<CreateSentenceService>(CreateSentenceService);
    const sentence = await createSentence.execute({ data });

    return res.status(201).json(instanceToPlain(sentence));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const sentenceId = +req.params.sentenceId;
    const data = req.body;

    try { UpdateSentenceSchema.parse(data); } catch (err) {
      throw new AppError('Validation error in request body', 400, null, err.errors);
    }

    const updateSentence = AppContainer.resolve<UpdateSentenceService>(UpdateSentenceService);
    const sentence = await updateSentence.execute({ sentenceId, data });

    return res.status(200).json(instanceToPlain(sentence));
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const sentenceId = +req.params.sentenceId;

    const getSentenceById = AppContainer.resolve<GetSentenceByIdService>(GetSentenceByIdService);
    const sentence = await getSentenceById.execute({ sentenceId });

    return res.status(200).json(instanceToPlain(sentence));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try { ListSentenceSchema.parse(data); } catch (err) {
      throw new AppError('Validation error in request body', 400, null, err.errors);
    }

    const listSentence = AppContainer.resolve<ListSentencesService>(ListSentencesService);
    const sentence = await listSentence.execute({ data });

    return res.status(200).json(sentence);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const sentenceId = +req.params.sentenceId;

    const deleteSentence = AppContainer.resolve<DeleteSentenceService>(DeleteSentenceService);
    await deleteSentence.execute({ sentenceId });

    return res.status(204).json({});
  }

  public async reactivate(req: Request, res: Response): Promise<Response> {
    const sentenceId = +req.params.sentenceId;

    const reactiveSentence = AppContainer.resolve<ReactivateSentenceService>(ReactivateSentenceService);
    await reactiveSentence.execute({ sentenceId });

    return res.status(204).json({});
  }
}

export default SentenceController;
