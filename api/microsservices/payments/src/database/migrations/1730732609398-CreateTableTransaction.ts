import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableTransaction1730732609398 implements MigrationInterface {
  private transactionTable = new Table({
    name: 'transaction',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'price',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'cpf',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'id_transaction_type',
        type: 'integer',
        length: '255',
      },
      {
        name: 'id_transaction_details',
        type: 'integer',
        length: '100',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
    ],
  });

  private idTransactionTypeForeignKey = new TableForeignKey({
    name: 'fk_id_transaction_type',
    columnNames: ['id_transaction_type'],
    referencedColumnNames: ['id'],
    referencedTableName: 'transaction_type',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.transactionTable);
    await queryRunner.createForeignKeys(this.transactionTable, [this.idTransactionTypeForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.transactionTable, [this.idTransactionTypeForeignKey]);
    await queryRunner.dropTable(this.transactionTable);
  }
}
