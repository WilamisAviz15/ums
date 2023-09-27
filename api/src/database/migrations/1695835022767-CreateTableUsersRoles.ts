import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableUsersRoles1683661379839 implements MigrationInterface {
  private UsersRolesTable = new Table({
    name: 'users_roles',
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
        name: 'role_id',
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

  private roleForeignKey = new TableForeignKey({
    name: 'fk_users_roles_role_id',
    columnNames: ['role_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'roles',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.UsersRolesTable);
    await queryRunner.createForeignKeys(this.UsersRolesTable, [
      this.roleForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.UsersRolesTable, [
      this.roleForeignKey,
    ]);
    await queryRunner.dropTable(this.UsersRolesTable);
  }
}
