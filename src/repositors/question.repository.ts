import { Questions } from "@models/Questions";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Questions)
export default class QuestionsRepository extends Repository<Questions> {}
