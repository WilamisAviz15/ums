import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableComments1683653810005 implements MigrationInterface {
  private commentsTable = new Table({
    name: 'comments',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'username',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'date',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'message',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'menu_meal_id',
        type: 'integer',
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
    await queryRunner.createTable(this.commentsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.commentsTable);
  }
}
