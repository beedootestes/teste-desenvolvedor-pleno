import { Answer } from "@modules/infra/typeorm/entities/Answers";
import { ICreateAnswerDTO } from "../dtos/ICreateAnswerDTO";


interface IAnswersRepository{
    create(answerData: ICreateAnswerDTO): Promise<Answer>;
    findResgistredAnswerByQuestionId(title: string, question_id: string): Promise<Answer | undefined >;
    findById(id: string): Promise<Answer | undefined>;
    find(): Promise<Answer[] | undefined>;
    findByQuestionId(question_id: string): Promise<Answer[] | undefined>;
    save(answer: Answer): Promise<Answer>;
    delete(id: string): Promise<void>;


}

export { IAnswersRepository }
