import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomLoggerService, LoggingInterceptor } from '@shared';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new CustomLoggerService('UserService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: Number(process.env.PORT) || 4000,
    },
    logger,
  });

  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await app.listen();
  logger.log('API Gateway Service is running');
}
bootstrap();
