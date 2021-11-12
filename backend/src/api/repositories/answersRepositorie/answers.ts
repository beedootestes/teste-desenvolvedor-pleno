
//All dependency imports
import prismaClient from "../../services/prisma";

//interface to data
interface Data {
    convertedId: string;
    answer: string
}

//Answer Create Repository
export async function createAnswer({ answer, convertedId }: Data) {
    const question_id = convertedId;

    return await prismaClient.answers.create({
        data: {
            answer,
            question_id
        }
    })
}

//Answer List Answers By Question_Id Repository
export async function listAnswers(question_id: string) {
    return await prismaClient.answers.findMany({
        where: {
            question_id
        }
    })

}
//Answer Update Repository
export async function updateAnswer({ convertedId, answer }: Data) {
    const id = convertedId;
    return await prismaClient.answers.update({
        where: {
            id
        },
        data: {
            answer,
            updated_at: new Date(),
        }
    });
}

//Answer Delete Repository
export async function deleteAnswer(id: string) {
    return await prismaClient.answers.delete({
        where: {
            id
        }
    });
}