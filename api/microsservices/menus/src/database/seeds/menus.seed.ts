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
        name: 'Agendamentos',
        route: 'agendamentos',
        menuKey: 'schedules',
        menuGroupId: 1,
      },
      {
        name: 'Perfil',
        route: 'perfil',
        menuKey: 'profile',
        menuGroupId: 1,
      },
      {
        name: 'Cardápio',
        route: 'cardapio',
        menuKey: 'menu',
        menuGroupId: 1,
      },
      {
        name: 'Confirmar refeição',
        route: 'confirmar-refeicao',
        menuKey: 'confirm-meal',
        menuGroupId: 1,
      },
    ]);
  }
}
