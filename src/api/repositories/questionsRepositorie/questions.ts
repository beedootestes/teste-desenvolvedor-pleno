import { Prisma } from ".prisma/client";
import prismaClient from "../../services/prisma";


export async function createQuestion(question: string) {
    return await prismaClient.questions.create({
        data: {
            question
        }
    })
}

export async function listQuestions() {
    return await prismaClient.questions.findMany();
}