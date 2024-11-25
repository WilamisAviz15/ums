import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { MetricsModule } from './metrics.module';

async function bootstrap() {
  const app = await NestFactory.create(MetricsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3013 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
