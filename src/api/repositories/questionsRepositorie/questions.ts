//All dependency imports
import prismaClient from "../../services/prisma";

//interface to data
interface Data {
    convertedId: string;
    question: string
}

//Question Create Repository
export async function createQuestion(question: string) {
    return await prismaClient.questions.create({
        data: {
            question
        }
    })
}

//Question List Repository
export async function listQuestions() {
    return await prismaClient.questions.findMany();
}

//Question Update Repository
export async function updateQuestion({ convertedId, question }: Data) {
    const id = convertedId;
    return await prismaClient.questions.update({
        where: {
            id
        },
        data: {
            question
        }
    });
}

//Question Delete Repository
export async function deleteQuestion(id: string) {
    return await prismaClient.questions.delete({
        where: {
            id
        }
    });
}