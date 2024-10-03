import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as fs from 'fs';
import { WebHookModule } from './webhook.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const httpsOptions = {
    cert: fs.readFileSync('./src/certificates/fullchain.pem'),
    key: fs.readFileSync('./src/certificates/fullchain-private-key.pem'),
    ca: fs.readFileSync('./src/certificates/certificado-publica-efi.crt'),
    minVersion: 'TLSv1.2',
    requestCert: true,
    rejectUnauthorized: true,
  };

  const app = await NestFactory.create(WebHookModule, { httpsOptions });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3012 },
  });
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Listening at http://localhost:${process.env.APP_PORT}`);
  });
}
bootstrap();
