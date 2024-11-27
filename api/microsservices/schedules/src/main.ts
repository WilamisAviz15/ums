import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { SchedulesModule } from './schedules.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulesModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3008 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3000, () => {
    Logger.log(`Listening at http://localhost:3000`);
  });
}
bootstrap();
