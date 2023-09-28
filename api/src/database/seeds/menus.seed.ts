import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { MenuEntity } from '../../modules/menus/entities/menu.entity';

export class MenusSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MenuEntity);
    await repository.insert([
      {
        name: 'Início',
        route: 'inicio',
        menuKey: 'inicio',
        menuGroupId: 1,
      },
      {
        name: 'Usuários',
        route: 'usuarios',
        menuKey: 'users',
        menuGroupId: 2,
      },
      {
        name: 'Ações',
        route: 'acoes',
        menuKey: 'actions',
        menuGroupId: 2,
      },
      {
        name: 'Grupos de menus',
        route: 'grupos-de-menus',
        menuKey: 'menus-group',
        menuGroupId: 2,
      },
      {
        name: 'Menus',
        route: 'menus',
        menuKey: 'menus',
        menuGroupId: 2,
      },
      {
        name: 'Perfis de acesso',
        route: 'perfis-de-acesso',
        menuKey: 'access-profile',
        menuGroupId: 2,
      },
      {
        name: 'Parâmetros de Sistema',
        route: 'parametros-de-sistema',
        menuKey: 'parameters',
        menuGroupId: 2,
      },
    ]);
  }
}
