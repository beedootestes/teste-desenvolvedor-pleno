import {container} from 'tsyringe';
import { QuestionsRepository } from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { AnswersRepository } from '@modules/questions/infra/typeorm/repositories/AnswersRespostory';



container.registerSingleton<IQuestionsRepository>(
    "QuestionsRepository",
    QuestionsRepository
);

container.registerSingleton<IAnswersRepository>(
    "AnswersRepository",
    AnswersRepository
);