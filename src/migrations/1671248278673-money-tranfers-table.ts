import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

const table = 'money_transfers';

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

export class moneyTranfersTable1671248278673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
          },
          {
            name: 'company_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'month',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'requested_amount',
            type: 'numeric',
            precision: 12,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'varchar',
            length: '255',
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

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: `IDX_${table}_id`,
        columnNames: ['user_id', 'company_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropForeignKey(table, foreignKey2);
    await queryRunner.dropIndex(table, `IDX_${table}_id`);
    await queryRunner.dropTable(table);
  }
}
