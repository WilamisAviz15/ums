import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRoles1695239303042 implements MigrationInterface {
  private roleTable = new Table({
    name: 'roles',
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
        isUnique: true,
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
    await queryRunner.createTable(this.roleTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.roleTable);
  }
}
