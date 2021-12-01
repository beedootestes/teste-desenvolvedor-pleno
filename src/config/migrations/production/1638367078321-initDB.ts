import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1638367078321 implements MigrationInterface {
    name = 'initDB1638367078321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."Sentence" ("id" SMALLSERIAL NOT NULL, "question" smallint, "text" character varying(256) NOT NULL, "type" character varying(12) NOT NULL, "enabled" boolean DEFAULT true, "issuedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_53d72d306504d8d66d2727c9ec4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "board_member_pkey" ON "public"."Sentence" ("id") `);
        await queryRunner.query(`ALTER TABLE "public"."Sentence" ADD CONSTRAINT "FK_cfe25b112765866d2ffe55847b0" FOREIGN KEY ("question") REFERENCES "public"."Sentence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Sentence" DROP CONSTRAINT "FK_cfe25b112765866d2ffe55847b0"`);
        await queryRunner.query(`DROP INDEX "public"."board_member_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."Sentence"`);
    }

}
