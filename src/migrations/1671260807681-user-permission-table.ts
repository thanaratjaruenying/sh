import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableUnique,
} from 'typeorm';

const table = 'user_permissions';

const foreignKey = new TableForeignKey({
  columnNames: ['company_id'],
  referencedColumnNames: ['id'],
  referencedTableName: 'companies',
  onDelete: 'CASCADE',
});

const foreignKey2 = new TableForeignKey({
  columnNames: ['user_id'],
  referencedColumnNames: ['id'],
  referencedTableName: 'users',
  onDelete: 'CASCADE',
});

export class userPermissionTable1671260807681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'company_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'role',
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

    await queryRunner.createForeignKey(table, foreignKey);

    await queryRunner.createForeignKey(table, foreignKey2);

    await queryRunner.createUniqueConstraint(
      table,
      new TableUnique({
        name: 'user_company_id',
        columnNames: ['user_id', 'company_id'],
      }),
    );

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: `IDX_${table}_ids`,
        columnNames: ['user_id', 'company_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(table, `IDX_${table}_ids`);
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropForeignKey(table, foreignKey2);
    await queryRunner.dropUniqueConstraint(table, 'user_company_id');
    await queryRunner.dropTable(table);
  }
}
