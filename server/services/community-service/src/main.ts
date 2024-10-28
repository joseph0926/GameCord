import { CustomLoggerService, LoggingInterceptor } from '@gamecord/shared';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new CustomLoggerService('UserService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: Number(process.env.PORT) || 4003,
    },
    logger,
  });

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen();
  logger.log('Community Service is running');
}
bootstrap();
