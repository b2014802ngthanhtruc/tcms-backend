import { DEFAULT_OPTS, QueueService } from '@shared/queue/queue.service';
import { MAIL_TEMPLATE, MAIL_TITLE } from '@shared/mail/constants';

import { AUTH_QUEUE_PROCESS_NAME } from '../constants';
import { Injectable } from '@nestjs/common';
import { MailService } from '@shared/mail/services';
import { QUEUE_NAMES } from '@shared/queue/constants';

@Injectable()
export class AuthQueueService {
  constructor(
    private readonly _queueService: QueueService,
    private readonly _mailService: MailService,
  ) {}

  async addSendVerifyEmailJob(email: string, code: string) {
    const job = await this._queueService.addJob({
      queueName: QUEUE_NAMES.AUTH_QUEUE,
      proccessName: AUTH_QUEUE_PROCESS_NAME.SEND_VERIFY_EMAIL,
      payload: {
        email,
        code,
      },
      opts: DEFAULT_OPTS,
    });

    return job;
  }

  async handleSendVerifyEmailJob({ email, code }) {
    try {
      const result = await this._mailService.sendEmailToAccount(
        email,
        code,
        MAIL_TITLE.VERIFY_TITLE,
        MAIL_TEMPLATE.VERIFY_TEMPLATE,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async addSendForgotPasswordEmailJob(email: string, code: string) {
    const job = await this._queueService.addJob({
      queueName: QUEUE_NAMES.AUTH_QUEUE,
      proccessName: AUTH_QUEUE_PROCESS_NAME.SEND_FORGOT_PASSWORD,
      payload: {
        email,
        code,
      },
      opts: DEFAULT_OPTS,
    });

    return job;
  }

  async handleSendForgotPasswordEmailJob({ email, code }) {
    try {
      const result = await this._mailService.sendEmailToAccount(
        email,
        code,
        MAIL_TITLE.RESET_TITLE,
        MAIL_TEMPLATE.RESET_TEMPLATE,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
