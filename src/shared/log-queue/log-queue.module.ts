import { Global, Module } from '@nestjs/common';

import { LogQueueService } from './services';

@Global()
@Module({
  controllers: [],
  providers: [LogQueueService],
  exports: [LogQueueService],
})
export class LogQueueModule {}
