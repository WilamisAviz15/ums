import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableMenuMeals1696026828320 implements MigrationInterface {
  private menuMealsTable = new Table({
    name: 'menu_meal',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'description',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'meal_id',
        type: 'integer',
      },
      {
        name: 'date',
        type: 'date',
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
    name: 'fk_menu_meal_meal_id',
    columnNames: ['meal_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'meals',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.menuMealsTable);
    await queryRunner.createForeignKeys(this.menuMealsTable, [
      this.mealIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.menuMealsTable, [
      this.mealIdForeignKey,
    ]);
    await queryRunner.dropTable(this.menuMealsTable);
  }
}
