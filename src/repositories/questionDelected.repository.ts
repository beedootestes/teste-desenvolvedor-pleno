import { QuestionsDelected } from "../models/QuestionsDelected";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(QuestionsDelected)
export default class QuestionsDelectedRepository extends Repository<QuestionsDelected> {}
