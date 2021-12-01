import Sentence from '@entities/Sentence';
import ICreateSentenceDTO from '@modules/sentence/dtos/ICreateSentenceDTO';
import ISentenceFiltersDTO from '@modules/sentence/dtos/ISentenceFiltersDTO';
import IUpdateSentenceDTO from '@modules/sentence/dtos/IUpdateSentenceDTO';

interface ISentenceRepository {
  create(data: ICreateSentenceDTO): Promise<Sentence | undefined>;
  find(where: object | object[], relations?: string[]): Promise<Sentence | undefined>;
  list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<Sentence[] | undefined>;
  update(sentence: Sentence, data: IUpdateSentenceDTO): Promise<Sentence | undefined>;
  delete(id: number): Promise<boolean>;
  deleteLogical(id: number): Promise<boolean>;
  filter(filters: ISentenceFiltersDTO): Promise<Sentence[] | undefined>;
}

export default ISentenceRepository;
