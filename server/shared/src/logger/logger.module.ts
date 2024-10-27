import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Global()
@Module({
  providers: [
    {
      provide: CustomLoggerService,
      useFactory: () => {
        return new CustomLoggerService();
      },
    },
  ],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
