import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1709535516896 implements MigrationInterface {
  name = 'Initial1709535516896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "applications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "text" text NOT NULL, "jobId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "title" varchar NOT NULL, "description" text NOT NULL, "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "email" varchar NOT NULL, "password" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "role" varchar CHECK( "role" IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    await queryRunner.query(
      `CREATE TABLE "temporary_applications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "text" text NOT NULL, "jobId" integer, CONSTRAINT "FK_f6ebb8bc5061068e4dd97df3c77" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_applications"("id", "created_at", "updated_at", "deleted_at", "firstName", "lastName", "email", "text", "jobId") SELECT "id", "created_at", "updated_at", "deleted_at", "firstName", "lastName", "email", "text", "jobId" FROM "applications"`,
    );
    await queryRunner.query(`DROP TABLE "applications"`);
    await queryRunner.query(`ALTER TABLE "temporary_applications" RENAME TO "applications"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_jobs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "title" varchar NOT NULL, "description" text NOT NULL, "userId" integer, CONSTRAINT "FK_79ae682707059d5f7655db4212a" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_jobs"("id", "created_at", "updated_at", "deleted_at", "title", "description", "userId") SELECT "id", "created_at", "updated_at", "deleted_at", "title", "description", "userId" FROM "jobs"`,
    );
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`ALTER TABLE "temporary_jobs" RENAME TO "jobs"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" RENAME TO "temporary_jobs"`);
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "title" varchar NOT NULL, "description" text NOT NULL, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "jobs"("id", "created_at", "updated_at", "deleted_at", "title", "description", "userId") SELECT "id", "created_at", "updated_at", "deleted_at", "title", "description", "userId" FROM "temporary_jobs"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_jobs"`);
    await queryRunner.query(`ALTER TABLE "applications" RENAME TO "temporary_applications"`);
    await queryRunner.query(
      `CREATE TABLE "applications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "text" text NOT NULL, "jobId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "applications"("id", "created_at", "updated_at", "deleted_at", "firstName", "lastName", "email", "text", "jobId") SELECT "id", "created_at", "updated_at", "deleted_at", "firstName", "lastName", "email", "text", "jobId" FROM "temporary_applications"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_applications"`);
    await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "applications"`);
  }
}
