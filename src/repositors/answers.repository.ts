import { Answers } from "@models/Answers";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Answers)
export default class AnswersRepository extends Repository<Answers> {}
