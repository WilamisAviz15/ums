import { Module } from '@nestjs/common';

import { EnvironmentProviderModule } from './environment/environment.provider';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EnvironmentProviderModule],
})
export class AppModule {}
