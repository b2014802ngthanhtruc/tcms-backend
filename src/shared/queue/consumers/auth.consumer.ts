import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';

import { AUTH_QUEUE_PROCESS_NAME } from '@modules/auth/constants';
import { AuthQueueService } from '@modules/auth/services';
import { Job } from 'bull';
import { QUEUE_NAMES } from '../constants';

@Processor(QUEUE_NAMES.AUTH_QUEUE)
export class AuthConsumer {
  constructor(private readonly _authQueueService: AuthQueueService) {}

  @OnQueueActive()
  onActive() {
    console.log('Active');
  }

  @OnQueueFailed()
  onFailed(error) {
    console.log('Failed: ', error);
  }

  @OnQueueError()
  onError(error) {
    console.log('Error: ', error);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log('Completed: ', job.name);
  }

  @Process(AUTH_QUEUE_PROCESS_NAME.SEND_VERIFY_EMAIL)
  async handleSendVerifyEmailJob(job: Job) {
    const { email, code } = job.data;
    await this._authQueueService.handleSendVerifyEmailJob({ email, code });
  }

  @Process(AUTH_QUEUE_PROCESS_NAME.SEND_FORGOT_PASSWORD)
  async handleSendForgotPasswordEmailJob(job: Job) {
    const { email, code } = job.data;
    await this._authQueueService.handleSendForgotPasswordEmailJob({
      email,
      code,
    });
  }
}
