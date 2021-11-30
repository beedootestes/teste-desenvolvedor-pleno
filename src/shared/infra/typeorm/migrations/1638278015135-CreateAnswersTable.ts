import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAnswersTable1638278015135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'answers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'question_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                ],

                foreignKeys: [
                    {
                      name: 'AnswerQuestion',
                      referencedTableName: 'questions',
                      referencedColumnNames: ['id'],
                      columnNames: ['question_id'],
                      onDelete: 'CASCADE',
                      onUpdate: 'CASCADE',
                    },
                  ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('answers');

    }

}
