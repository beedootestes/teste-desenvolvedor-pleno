import { Request, Response } from 'express';
import { createQuestion, listQuestions } from '../../repositories/questionsRepositorie/questions';

export async function createQuestionController(request: Request, response: Response) {
    const { question } = request.body;
    const repositorie = await createQuestion(question);

    return response.json(repositorie);
}

export async function listQuestionsController(request: Request, response: Response) {
    const repositorie = await listQuestions();

    return response.json(repositorie);
}