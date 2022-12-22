import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const table = 'companies';

export class companyTable1671248237697 implements MigrationInterface {
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
            name: 'address1',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'address2',
            type: 'character varying(255)',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'postcode',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'province',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'subdistrict',
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
      true,
    );

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: `IDX_${table}_id`,
        columnNames: ['id'],
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
    await queryRunner.dropIndex(table, `IDX_${table}_id`);
    await queryRunner.dropIndex(table, `IDX_${table}_email`);
    await queryRunner.dropIndex(table, `IDX_${table}_name`);
    await queryRunner.dropTable(table);
  }
}
