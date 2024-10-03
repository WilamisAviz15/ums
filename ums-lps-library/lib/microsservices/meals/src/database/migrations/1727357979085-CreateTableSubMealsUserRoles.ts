import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableSubMealsUserRoles1727357979085 implements MigrationInterface {
  private submealsUsersRolesTable = new Table({
    name: 'meals_users_roles',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.submealsUsersRolesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.submealsUsersRolesTable);
  }
}
