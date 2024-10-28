import { UserService } from '@modules/users/services';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private readonly _userService: UserService,
    private readonly _scheduleRegistry: SchedulerRegistry,
  ) {}

  //   @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  //   async handleCron() {
  //     const users = await this._userService.findAll({});
  //     this.logger.debug(users);
  //   }
}
