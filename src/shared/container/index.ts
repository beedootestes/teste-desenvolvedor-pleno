import {container} from 'tsyringe';
import { QuestionsRepository } from '@modules/infra/typeorm/repositories/QuestionsRepository';
import { IQuestionsRepository } from '@modules/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/repositories/IAnswersRepository';
import { AnswersRepository } from '@modules/infra/typeorm/repositories/AnswersRespostory';



container.registerSingleton<IQuestionsRepository>(
    "QuestionsRepository",
    QuestionsRepository
);

container.registerSingleton<IAnswersRepository>(
    "AnswersRepository",
    AnswersRepository
);