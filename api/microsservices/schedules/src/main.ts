import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { SchedulesModule } from './schedules.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulesModule);

  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
