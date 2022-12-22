import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const table = 'users';

export class userTable1671248256486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'email',
            type: 'character varying(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'hash',
            type: 'character varying(255)',
            isNullable: true,
          },
          {
            name: 'salt',
            type: 'character varying(255)',
            isNullable: true,
          },
          {
            name: 'first_name',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'system_role',
            type: 'character varying(255)',
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
      }),
    );

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: `IDX_${table}_email`,
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: `IDX_${table}_name`,
        columnNames: ['first_name', 'last_name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(table, `IDX_${table}_email`);
    await queryRunner.dropIndex(table, `IDX_${table}_name`);
    await queryRunner.dropTable(table);
  }
}
