import { Module } from '@nestjs/common';
import { EnvironmentProviderModule } from './environment/environment.provider';

import { MenusModule } from './modules/menus/menus.module';
import { MenusGroupsModule } from './modules/menus-groups/menus-groups.module';
import { DatabaseProviderModule } from './providers/database/database.provider';

@Module({
  imports: [DatabaseProviderModule, MenusGroupsModule, MenusModule],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
