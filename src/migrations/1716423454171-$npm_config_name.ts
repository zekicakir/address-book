import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716423454171 implements MigrationInterface {
    name = ' $npmConfigName1716423454171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addressbook" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "telephone" character varying NOT NULL, "age" integer NOT NULL, "gender" character varying NOT NULL, "city" character varying NOT NULL, "userid" integer NOT NULL, CONSTRAINT "PK_0588a9a111cfb5d580d23e5dad2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addressextrafield" ("id" SERIAL NOT NULL, "addressid" integer NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_4d7e4b9c90710184885d812c392" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addressextrafield" ADD CONSTRAINT "FK_5044b6782e95578c84dc7dd802e" FOREIGN KEY ("addressid") REFERENCES "addressbook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addressextrafield" DROP CONSTRAINT "FK_5044b6782e95578c84dc7dd802e"`);
        await queryRunner.query(`DROP TABLE "addressextrafield"`);
        await queryRunner.query(`DROP TABLE "addressbook"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
