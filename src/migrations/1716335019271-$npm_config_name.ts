import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716335019271 implements MigrationInterface {
    name = ' $npmConfigName1716335019271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "deneme" character varying NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
