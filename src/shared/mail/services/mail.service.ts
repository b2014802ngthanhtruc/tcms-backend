import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailToAccount(
    email: string,
    code: string,
    title: string,
    template: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: title,
        template: template,
        context: {
          code,
          email,
        },
      });
      console.log('Success');
      return {
        message: 'Email was sent successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
