import { AllExceptionsFilter } from '@common/filters';
import { ResponseTransformInterceptor } from '@common/interceptors';
import { CONFIG_VAR } from '@config/config.constant';
import { ConfigSchema } from '@config/config.schema';
import { AddressModule } from '@modules/address/address.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ClassModule } from '@modules/classes/class.module';
import { MediaModule } from '@modules/medias/media.module';
import { StudentModule } from '@modules/students/student.module';
import { TutorModule } from '@modules/tutors/tutor.module';
import { UserModule } from '@modules/users/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MailModule } from '@shared/mail/mail.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { QueueModule } from '@shared/queue/queue.module';
import { S3Module } from '@shared/s3/s3.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Environment } from './common/enums';

// import { TaskModule } from '@shared/schedule/task.module';

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

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get(CONFIG_VAR.MAIL_USER),
            pass: configService.get(CONFIG_VAR.MAIL_PASSWORD),
          },
        },
        defaults: {
          from: '"Day Break Tutor Center" <no-reply@example.com>',
        },
        template: {
          dir: 'src/shared/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),

    // Shared
    PrismaModule,
    QueueModule,
    MailModule,
    S3Module,
    // TaskModule,

    // Feature
    UserModule,
    StudentModule,
    TutorModule,
    AuthModule,
    ClassModule,
    AddressModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}
