import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableActionsMenus1683653846284
  implements MigrationInterface
{
  private actionsMenusTable = new Table({
    name: 'actions_menus',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'action_id',
        type: 'integer',
      },
      {
        name: 'menu_id',
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

  private actionIdForeignKey = new TableForeignKey({
    name: 'fk_actions_menus_action_id',
    columnNames: ['action_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'actions',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.actionsMenusTable);
    await queryRunner.createForeignKeys(this.actionsMenusTable, [
      this.actionIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.actionsMenusTable, [
      this.actionIdForeignKey,
    ]);
    await queryRunner.dropTable(this.actionsMenusTable);
  }
}
