import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableMenus1666219134574 implements MigrationInterface {
  private menusTable = new Table({
    name: 'menus',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '255',
      },
      {
        name: 'menu_key',
        type: 'VARCHAR',
        length: '255',
      },
      {
        name: 'route',
        type: 'VARCHAR',
        length: '255',
      },
      {
        name: 'icon',
        type: 'VARCHAR',
        length: '255',
        isNullable: true,
      },
      {
        name: 'menu_group_id',
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

  private menuGroupIdForeignKey = new TableForeignKey({
    name: 'fk_menus_group_menu_id',
    columnNames: ['menu_group_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'menus_groups',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.menusTable);
    await queryRunner.createForeignKey(
      this.menusTable,
      this.menuGroupIdForeignKey,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.menusTable,
      this.menuGroupIdForeignKey,
    );
    await queryRunner.dropTable(this.menusTable);
  }
}
