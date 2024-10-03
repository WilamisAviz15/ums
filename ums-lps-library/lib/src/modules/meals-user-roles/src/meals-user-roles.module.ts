import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { MealsUserRolesController } from './meals-user-roles.controller';
import { MealsUserRolesService } from './meals-user-roles.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEALS',
        transport: Transport.TCP,
        options: { port: 3007 },
      },
    ]),
  ],
  controllers: [MealsUserRolesController],
  providers: [MealsUserRolesService],
})
export class MealsUserRolesModule {}
