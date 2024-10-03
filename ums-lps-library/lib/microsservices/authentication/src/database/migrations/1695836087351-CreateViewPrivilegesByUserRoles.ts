import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateViewPrivilegesByUserRoles1683830306088
  implements MigrationInterface
{
  private viewName = 'view_privileges_by_user_roles';
  private query = `
      SELECT CONCAT(UPPER(m.menu_key), '_', UPPER(a.name)) AS "key",
      p.role_id                                     AS "role_id",
      m.name                                        AS "menu",
      m.route                                       AS "route",
      ac.action_id
    FROM ums_menus.privileges p
        JOIN ums_actions.actions_menus ac ON ac.id = p.action_menu_id
        JOIN ums_actions.actions a ON a.id = ac.action_id
        JOIN ums_menus.menus m ON m.id = ac.menu_id
    GROUP BY ac.id, p.role_id, m.menu_key, a.name, m.name, m.route, ac.action_id
    ORDER BY m.menu_key;
  `;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE VIEW ${this.viewName} AS ${this.query}`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW ${this.viewName} AS ${this.query}`);
  }
}
