import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1638506200056 implements MigrationInterface {
    name = 'initDB1638506200056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."sentence" ("id" SMALLSERIAL NOT NULL, "question" smallint, "text" character varying(256) NOT NULL, "type" character varying(12) NOT NULL, "enabled" boolean DEFAULT true, "issuedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_03ac5c7f08157f507cd9994ae3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "sentence_pkey" ON "public"."sentence" ("id") `);
        await queryRunner.query(`ALTER TABLE "public"."sentence" ADD CONSTRAINT "FK_a23be67194d993f613758dc3667" FOREIGN KEY ("question") REFERENCES "public"."sentence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."sentence" DROP CONSTRAINT "FK_a23be67194d993f613758dc3667"`);
        await queryRunner.query(`DROP INDEX "public"."sentence_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."sentence"`);
    }

}
