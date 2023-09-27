import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablePrivileges1666220277280 implements MigrationInterface {
  private privilegesTable = new Table({
    name: 'privileges',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'role_id',
        type: 'INTEGER',
      },
      {
        name: 'action_menu_id',
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

  private roleIdForeignKey = new TableForeignKey({
    name: 'fk_privileges_role_id',
    columnNames: ['role_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'roles',
    onDelete: 'CASCADE',
  });

  private actionMenuIdForeignKey = new TableForeignKey({
    name: 'fk_privileges_action_menu_id',
    columnNames: ['action_menu_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'actions_menus',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.privilegesTable);
    await queryRunner.createForeignKeys(this.privilegesTable, [
      this.roleIdForeignKey,
      this.actionMenuIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.privilegesTable, [
      this.actionMenuIdForeignKey,
      this.roleIdForeignKey,
    ]);
    await queryRunner.dropTable(this.privilegesTable);
  }
}
