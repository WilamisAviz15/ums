import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';

import { EnvironmentProviderModule } from './environment/environment.provider';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [EnvironmentProviderModule],
})
export class WebHookModule {}
