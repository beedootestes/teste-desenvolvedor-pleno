//All dependency imports
import { Request, Response } from 'express';
import {
    createQuestion,
    deleteQuestion,
    listQuestions,
    listQuestionsAnswers,
    updateQuestion
} from '../../repositories/questionsRepositorie/questions';

//Question Create Controller
export async function createQuestionController(request: Request, response: Response) {
    const { question } = request.body;

    if (!question) {
        return response.status(400).json({message: "MissingDataException"});
    }

    const repositorie = await createQuestion(question);

    return response.json(repositorie);
}

//Question List Controller
export async function listQuestionsController(request: Request, response: Response) {
    const repositorie = await listQuestions();

    return response.json(repositorie);
}

//Questions Answers List Controller
export async function listQuestionsAnswersController(request: Request, response: Response) {
    const repositorie = await listQuestionsAnswers();

    return response.json(repositorie);
}

//Question Update Controller
export async function updateQuestionController(request: Request, response: Response) {
    const { id } = request.query;
    const { question } = request.body;

    if (!id || !question) {
        return response.status(400).json({message: "MissingDataException"});
    }

    const convertedId = String(id);
    const data = {
        convertedId,
        question,
    }
    const repositorie = await updateQuestion(data);

    return response.json(repositorie);
}

//Question Delete Controller
export async function deleteQuestionController(request: Request, response: Response) {
    const { id } = request.query;
    const convertedId = String(id);

    if (!id) {
        return response.status(400).json({ message: "MissingDataException" });
    }

    const result = await deleteQuestion(convertedId);

    if (result) {
        return response.status(500).json({message: result})
    }

    return response.json({message: "Question successfully deleted"});
}