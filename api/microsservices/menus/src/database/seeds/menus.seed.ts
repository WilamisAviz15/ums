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
        module: 'AuthenticationModule',
      },
      {
        name: 'Usuários',
        route: 'usuarios',
        menuKey: 'users',
        menuGroupId: 2,
        module: 'UserModule',
      },
      {
        name: 'Ações',
        route: 'acoes',
        menuKey: 'actions',
        menuGroupId: 2,
        module: 'ActionModule',
      },
      {
        name: 'Grupos de menus',
        route: 'grupos-de-menus',
        menuKey: 'menus-group',
        menuGroupId: 2,
        module: 'MenuGroupModule',
      },
      {
        name: 'Menus',
        route: 'menus',
        menuKey: 'menus',
        menuGroupId: 2,
        module: 'MenuModule',
      },
      {
        name: 'Perfis de acesso',
        route: 'perfis-de-acesso',
        menuKey: 'access-profile',
        menuGroupId: 2,
        module: 'ProfileModule',
      },
      {
        name: 'Agendamentos',
        route: 'agendamentos',
        menuKey: 'schedules',
        menuGroupId: 1,
        module: 'ScheduleModule',
      },
      {
        name: 'Perfil',
        route: 'perfil',
        menuKey: 'profile',
        menuGroupId: 1,
        module: 'ProfileModule',
      },
      {
        name: 'Cardápio',
        route: 'cardapio',
        menuKey: 'menu',
        menuGroupId: 1,
        module: 'MenuMealModule',
      },
      {
        name: 'Confirmar refeição',
        route: 'confirmar-refeicao',
        menuKey: 'confirm-meal',
        menuGroupId: 1,
        module: 'ScheduleModule',
      },
      {
        name: 'Avaliações',
        route: 'avaliacoes',
        menuKey: 'avaliacoes',
        menuGroupId: 1,
        module: 'RatingModule',
      },
      {
        name: 'Refeições',
        route: 'refeicoes',
        menuKey: 'refeicoes',
        menuGroupId: 1,
        module: 'MealModule',
      },
      {
        name: 'Configurações',
        route: 'config',
        menuKey: 'configuracoes',
        menuGroupId: 2,
        module: 'ConfigModule',
      },
      {
        name: 'Pagamentos',
        route: 'pagamentos',
        menuKey: 'pagamentos',
        menuGroupId: 1,
        module: 'PaymentsModule',
      },
      {
        name: 'Relatórios',
        route: 'relatorios',
        menuKey: 'relatorios',
        menuGroupId: 1,
        module: 'ReportsModule',
      },
    ]);
  }
}
