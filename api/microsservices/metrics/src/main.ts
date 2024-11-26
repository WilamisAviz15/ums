import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { MetricsModule } from './metrics.module';

async function bootstrap() {
  const app = await NestFactory.create(MetricsModule);

  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
