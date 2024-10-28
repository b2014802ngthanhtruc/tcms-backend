import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
