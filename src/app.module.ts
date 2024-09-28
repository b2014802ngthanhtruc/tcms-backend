import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AllExceptionsFilter } from '@common/filters';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from '@config/config.schema';
import { Environment } from './common/enums';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { ResponseTransformInterceptor } from '@common/interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || Environment.DEVELOPMENT}`,
      isGlobal: true,
      cache: true,
      validate(config) {
        return ConfigSchema.parse(config);
      },
    }),

    // Shared
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}
