import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableSchedules1695853220423 implements MigrationInterface {
  private scheduleTable = new Table({
    name: 'schedules',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'user_id',
        type: 'integer',
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
        name: 'used',
        type: 'TINYINT',
        default: 0,
      },
      {
        name: 'paid',
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

  // private userIdForeignKey = new TableForeignKey({
  //   name: 'fk_schedule_user_id',
  //   columnNames: ['user_id'],
  //   referencedColumnNames: ['id'],
  //   referencedTableName: 'users',
  //   onDelete: 'CASCADE',
  // });

  // private mealIdForeignKey = new TableForeignKey({
  //   name: 'fk_schedule_meal_id',
  //   columnNames: ['meal_id'],
  //   referencedColumnNames: ['id'],
  //   referencedTableName: 'meals',
  //   onDelete: 'CASCADE',
  // });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.scheduleTable);
    // await queryRunner.createForeignKeys(this.scheduleTable, [
    //   this.userIdForeignKey,
    //   this.mealIdForeignKey,
    // ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKeys(this.scheduleTable, [
    //   this.userIdForeignKey,
    //   this.mealIdForeignKey,
    // ]);
    await queryRunner.dropTable(this.scheduleTable);
  }
}
