import 'reflect-metadata';
import { Container } from 'inversify';

import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';
import SentenceRepository from '@modules/sentence/infra/typeorm/repositories/SentenceRepository';

const container = new Container();

// repositories
container.bind<ISentenceRepository>(Types.SentenceRepository).to(SentenceRepository);
// providers

export default container;
