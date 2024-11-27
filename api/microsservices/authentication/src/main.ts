import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './authentication.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3006 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3000, () => {
    Logger.log(`Listening at http://localhost:3000`);
  });
}
bootstrap();
