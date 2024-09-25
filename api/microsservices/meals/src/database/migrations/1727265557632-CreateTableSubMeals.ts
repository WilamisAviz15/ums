import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableSubMeals1727265557632 implements MigrationInterface {
  private submealsTable = new Table({
    name: 'submeals',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'meal_id',
        type: 'integer',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'price',
        type: 'varchar',
        length: '255',
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

  private mealIdForeignKey = new TableForeignKey({
    name: 'fk_submeal_meal_id',
    columnNames: ['meal_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'meals',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.submealsTable);
    await queryRunner.createForeignKeys(this.submealsTable, [this.mealIdForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.submealsTable, [this.mealIdForeignKey]);
    await queryRunner.dropTable(this.submealsTable);
  }
}
