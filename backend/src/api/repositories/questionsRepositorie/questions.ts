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

//Question List Repository
export async function listQuestionsAnswers() {
    return await prismaClient.questions.findMany({
        orderBy: {
            created_at: 'desc'
        },
        include: {
            answers: true
        }
    });
}


//Question Update Repository
export async function updateQuestion({ convertedId, question }: Data) {
    const id = convertedId;

    return await prismaClient.questions.update({
        where: {
            id
        },
        data: {
            question,
            updated_at: new Date(),
        }
    });
}

//Question Delete Repository
export async function deleteQuestion(id: string) {
    const question = await prismaClient.questions.findUnique({
        where: {
            id
        },
        include: {
            answers: true
        }
    });

    if (!question) {
        return 'Question not found'
    }

    if (question?.answers.length > 0) {
        return 'Question cannot be deleted as it has answers';
    }

    await prismaClient.questions.delete({
        where: {
            id
        }
    });

}