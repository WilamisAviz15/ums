import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [HttpModule],
  controllers: [ProfileController],
  providers: [EnvironmentProviderModule, ProfileService],
})
export class ProfileModule {}
