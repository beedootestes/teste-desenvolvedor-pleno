import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddQuestionIdToAnswersTable1637685547630
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'question_answers',
      new TableColumn({
        name: 'question_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'question_answers',
      new TableForeignKey({
        name: 'question_answers_question',
        columnNames: ['question_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'questions',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'question_answers',
      'question_answers_question',
    );

    await queryRunner.dropColumn('question_answers', 'question_id');
  }
}
