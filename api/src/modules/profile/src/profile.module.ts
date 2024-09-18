import { Module } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE',
        transport: Transport.TCP,
        options: { port: 3005 },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
