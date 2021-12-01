import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Sentence from '@entities/Sentence';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';

import ICreateSentenceDTO from '@modules/sentence/dtos/ICreateSentenceDTO';
import IUpdateSentenceDTO from '@modules/sentence/dtos/IUpdateSentenceDTO';
import ISentenceFiltersDTO from '@modules/sentence/dtos/ISentenceFiltersDTO';

@injectable()
class SentenceRepository implements ISentenceRepository {
  private ormRepository = getConnection().getRepository(Sentence)

  public async create(data: ICreateSentenceDTO): Promise<Sentence | undefined> {
    const sentence = this.ormRepository.create(data);
    return this.ormRepository.save(sentence).catch(() => undefined);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Sentence | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where: object | object[], relations?: string[], take?: number, skip?: number): Promise<Sentence[] | undefined> {
    return this.ormRepository.find({ where, relations, take, skip }).catch(() => undefined);
  }

  public async update(sentence: Sentence, data: IUpdateSentenceDTO): Promise<Sentence | undefined> {
    this.ormRepository.merge(sentence, data);
    return this.ormRepository.save(sentence);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete(id).then(() => true).catch(() => false);
  }

  public async deleteLogical(id: number): Promise<boolean> {
    const sentence = await this.ormRepository.findOne(id);
    return this.ormRepository.save({ ...sentence, enabled: false }).then(() => true).catch(() => false);
  }

  public async filter(filters: ISentenceFiltersDTO): Promise<Sentence[] | undefined> {
    const { where, page, order } = filters;

    const queryBuilder = this.ormRepository
      .createQueryBuilder('sentence')
      .where('sentence.enabled = :enabled', { enabled: where && typeof where.enabled !== 'undefined' ? where.enabled : true });

    // where
    if (where) {
      if (where.id) { queryBuilder.andWhere('sentence.id = :id', { id: where.id }); }
      if (where.question) { queryBuilder.andWhere('sentence.question = :question', { question: where.question }); }
      if (where.type) { queryBuilder.andWhere('sentence.type = :type', { type: where.type }); }
      if (where.text) { queryBuilder.andWhere('user.text ILIKE :text', { text: `%${where.text}%` }); }
    }

    // page
    if (page) { queryBuilder.offset(page.offset ? page.offset * (page.size || 30) : 0).limit((page.size || 30)); }

    // order
    if (order && order.dsc) {
      queryBuilder.orderBy(order.by, 'DESC');
    } else if (order) {
      queryBuilder.orderBy(order.by);
    } else {
      queryBuilder.orderBy('sentence.id');
    }

    return queryBuilder.getMany();
  }
}

export default SentenceRepository;
