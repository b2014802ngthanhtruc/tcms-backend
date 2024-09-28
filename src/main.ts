import * as compression from 'compression';

import {
  ClassSerializerInterceptor,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import helmet from 'helmet';

async function getApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(compression());
  app.use(helmet());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ZodValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  return app;
}
async function bootstrap() {
  const app = await getApp();

  const port = process.env.PORT || 3000;
  const node_env = process.env.NODE_ENV;

  await app.listen(port, () => {
    const logger = new Logger(AppModule.name);
    logger.log(`Application use ${node_env} environment`);
    logger.log(`Application is running on port ${port}`);
  });
}
bootstrap();
