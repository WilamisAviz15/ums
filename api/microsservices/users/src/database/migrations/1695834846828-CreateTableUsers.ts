import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUser1695229594731 implements MigrationInterface {
  private userTable = new Table({
    name: 'users',
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
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
      {
        name: 'cpf',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
      {
        name: 'register',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
      {
        name: 'last_access',
        type: 'timestamp',
        default: 'current_timestamp',
        isNullable: true,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'role_id',
        type: 'varchar',
        length: '5',
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
    await queryRunner.createTable(this.userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
