import {container} from 'tsyringe';
import { QuestionsRepository } from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';


container.registerSingleton<IQuestionsRepository>(
    "QuestionsRepository",
    QuestionsRepository
);
