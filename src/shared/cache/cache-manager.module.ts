import * as redisStore from 'cache-manager-ioredis';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { CONFIG_VAR } from '@config/config.constant';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { MINUTE } from '@common/constants';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get(CONFIG_VAR.REDIS_HOST),
        port: configService.get(CONFIG_VAR.REDIS_PORT),
        ttl: 2 * MINUTE,
        db: configService.get(CONFIG_VAR.REDIS_DB_CACHE),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheCongfigModule {}
