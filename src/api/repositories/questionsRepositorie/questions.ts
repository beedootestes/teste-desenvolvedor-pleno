import prismaClient from "../../services/prisma";
interface Data {
    convertedId: string;
    question: string
}

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

export async function deleteQuestion(id: string) {
    return await prismaClient.questions.delete({
        where: {
            id
        }
    });
}