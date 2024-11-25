import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePayments1730726604632 implements MigrationInterface {
  private paymentsTable = new Table({
    name: 'payments',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'cpf',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'price',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'qr_code',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'imagem_qrcode',
        type: 'varchar',
        length: '5000',
      },
      {
        name: 'link_visualizacao',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'completed',
        type: 'TINYINT',
        default: 0,
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
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.paymentsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.paymentsTable);
  }
}
