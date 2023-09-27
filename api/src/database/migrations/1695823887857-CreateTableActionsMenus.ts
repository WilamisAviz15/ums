import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableActionsMenus1666219180093
  implements MigrationInterface
{
  private actionsMenusTable = new Table({
    name: 'actions_menus',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'action_id',
        type: 'INTEGER',
      },
      {
        name: 'menu_id',
        type: 'INTEGER',
      },
      {
        name: 'created_at',
        type: 'TIMESTAMP',
        default: 'NOW()',
      },
      {
        name: 'updated_at',
        type: 'TIMESTAMP',
        default: 'NOW() ON UPDATE CURRENT_TIMESTAMP()',
      },
      {
        name: 'deleted_at',
        type: 'TIMESTAMP',
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

  private menuIdForeignKey = new TableForeignKey({
    name: 'fk_actions_menus_menu_id',
    columnNames: ['menu_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'menus',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.actionsMenusTable);
    await queryRunner.createForeignKeys(this.actionsMenusTable, [
      this.actionIdForeignKey,
      this.menuIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.actionsMenusTable, [
      this.menuIdForeignKey,
      this.actionIdForeignKey,
    ]);
    await queryRunner.dropTable(this.actionsMenusTable);
  }
}
