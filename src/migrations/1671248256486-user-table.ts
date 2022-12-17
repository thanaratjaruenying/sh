import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

const table = 'users';

const foreignKey = new TableForeignKey({
  columnNames: ['company_id'],
  referencedColumnNames: ['id'],
  referencedTableName: 'companies',
  onDelete: 'CASCADE',
});

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
          },
          {
            name: 'company_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'character varying(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'character varying(255)',
            isNullable: false,
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
            name: 'role',
            type: 'character varying(255)',
            isNullable: false,
          },
          {
            name: 'salary',
            type: 'numeric',
            precision: 12,
            scale: 2,
            isNullable: false,
            default: 0,
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

    await queryRunner.createForeignKey(table, foreignKey);

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
        name: `IDX_${table}_email_company_id`,
        columnNames: ['email', 'company_id'],
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
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropIndex(table, `IDX_${table}_email`);
    await queryRunner.dropIndex(table, `IDX_${table}_email_company_id`);
    await queryRunner.dropIndex(table, `IDX_${table}_name`);
    await queryRunner.dropTable(table);
  }
}
