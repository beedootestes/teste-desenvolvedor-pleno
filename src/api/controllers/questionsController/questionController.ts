import { Request, Response } from 'express';
import { createQuestion, deleteQuestion, listQuestions, updateQuestion } from '../../repositories/questionsRepositorie/questions';

export async function createQuestionController(request: Request, response: Response) {
    const { question } = request.body;
    const repositorie = await createQuestion(question);

    return response.json(repositorie);
}

export async function listQuestionsController(request: Request, response: Response) {
    const repositorie = await listQuestions();

    return response.json(repositorie);
}

export async function updateQuestionController(request: Request, response: Response) {
    const { id } = request.query;
    const { question } = request.body;
    const convertedId = String(id);
    const data = {
        convertedId,
        question,
    }
    const repositorie = await updateQuestion(data);

    return response.json(repositorie);
}

export async function deleteQuestionController(request: Request, response: Response) {
    const { id } = request.query;
    const convertedId = String(id);

    await deleteQuestion(convertedId);

    return response.json({message: "Question successfully deleted"});
}