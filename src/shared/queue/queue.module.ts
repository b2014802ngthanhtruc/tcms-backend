import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bull';
import { CONFIG_VAR } from '@config/config.constant';
import { MINUTES_PER_HOUR } from '@common/constants';
import { QueueService } from './queue.service';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          redis: {
            host: config.get(CONFIG_VAR.REDIS_HOST),
            port: config.get(CONFIG_VAR.REDIS_PORT),
            password: config.get(CONFIG_VAR.REDIS_PASSWORD),
            ttl: MINUTES_PER_HOUR,
            db: config.get(CONFIG_VAR.REDIS_DB_QUEUE),
          },
        };
      },
    }),

    // BullModule.registerQueue({
    //   name: QUEUE_NAMES.AUTH_QUEUE, // assign from queue name in file index folder constants
    // }),
    // BullModule.registerQueue({
    //   name: QUEUE_NAMES.OWNER_QUEUE, // assign from queue name in file index folder constants
    // }),
    // BullModule.registerQueue({
    //   name: QUEUE_NAMES.PATIENT_QUEUE, // assign from queue name in file index folder constants
    // }),
    // BullModule.registerQueue({
    //   name: QUEUE_NAMES.NURSE_QUEUE, // assign from queue name in file index folder constants
    // }),
    // BullModule.registerQueue({
    //   name: QUEUE_NAMES.DOCTOR_QUEUE, // assign from queue name in file index folder constants
    // }),
    // //
    // AuthModule,
    // OwnerModule,
    // NurseModule,
    // DoctorModule,
    // PatientModule,
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
