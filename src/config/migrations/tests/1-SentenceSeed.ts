/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import SentenceSeed from '@config/seeds/SentenceSeed.json';

export class SeedSentence1611163640922 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('sentence').save(SentenceSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
