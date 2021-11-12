//All dependency imports
import { Request, Response } from 'express';
import {
    createAnswer,
    deleteAnswer,
    listAnswers,
    updateAnswer,
} from '../../repositories/answersRepositorie/answers';

//Question Create Controller
export async function createAnswerController(request: Request, response: Response) {
    const { question_id } = request.query;
    const { answer } = request.body;

    if (!question_id || !answer) {
        return response.status(400).json({message: "MissingDataException"});
    }

    const convertedId = String(question_id);
    const data = {
        answer,
        convertedId
    };
    const repositorie = await createAnswer(data);

    return response.json(repositorie);
}

//Question List Controller
export async function listAnswersController(request: Request, response: Response) {
    const { question_id } = request.params;

    if (!question_id) {
        return response.status(400).json({message: "MissingDataException"});
    }

    const repositorie = await listAnswers(question_id);

    return response.json(repositorie);
}

//Question Update Controller
export async function updateAnswerController(request: Request, response: Response) {
    const { id } = request.query;
    const { answer } = request.body;

    if (!id || !answer) {
        return response.status(400).json({message: "MissingDataException"});
    }

    const convertedId = String(id);
    const data = {
        convertedId,
        answer
    }
    const repositorie = await updateAnswer(data);

    return response.json(repositorie);
}

//Question Delete Controller
export async function deleteAnswerController(request: Request, response: Response) {
    const { id } = request.query;

    if (!id) {
        return response.status(400).json({message: "MissingDataException"});
    }

    const convertedId = String(id);

    await deleteAnswer(convertedId);

    return response.json({message: "Answer successfully deleted"});
}