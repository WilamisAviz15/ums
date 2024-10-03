import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRatings1683653810005 implements MigrationInterface {
  private ratingTable = new Table({
    name: 'ratings',
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
        name: 'message',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'stars',
        type: 'integer',
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
    await queryRunner.createTable(this.ratingTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.ratingTable);
  }
}
