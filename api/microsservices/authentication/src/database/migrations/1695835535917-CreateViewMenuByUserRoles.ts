import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateViewMenuByUserRoles1683830300678 implements MigrationInterface {
  private viewName = 'view_menu_by_user_roles';
  private query = `
      SELECT m.id       AS "id",
      m.name     AS "menu",
      mg.name    AS "menu_group",
      m.route    AS "route",
      m.menu_key AS "menu_key",
      m.icon     AS "icon",
      m.module   AS "module",
      p.role_id  AS "role_id"
    FROM ums_menus.privileges p
        INNER JOIN ums_actions.actions_menus am ON am.id = p.action_menu_id AND am.action_id = 5
        INNER JOIN ums_menus.menus m ON m.id = am.menu_id
        INNER JOIN ums_menus.menus_groups mg on m.menu_group_id = mg.id
    GROUP BY m.id, p.role_id, m.name, mg.name, m.route, m.icon, m.menu_key
    ORDER BY m.name ASC;
  `;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE VIEW ${this.viewName} AS ${this.query}`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW ${this.viewName} AS ${this.query}`);
  }
}
