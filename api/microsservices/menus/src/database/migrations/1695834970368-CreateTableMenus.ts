import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableMenus1683653830584 implements MigrationInterface {
  private menusTable = new Table({
    name: 'menus',
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
        name: 'menu_key',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'route',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'icon',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'menu_group_id',
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
