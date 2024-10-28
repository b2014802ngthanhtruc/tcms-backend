import { StudentModule } from '@modules/students/student.module';
import { TutorModule } from '@modules/tutors/tutor.module';
import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import {
  AuthAdminController,
  AuthGeneralController,
  AuthStudentController,
  AuthTutorController,
} from './controllers';
import { AuthQueueService, AuthService } from './services';
import {
  AdminAccessStrategy,
  LocalStrategy,
  StudentAccessStrategy,
  TutorAccessStrategy,
} from './strategies';

@Module({
  imports: [UserModule, StudentModule, TutorModule],
  controllers: [
    AuthGeneralController,
    AuthAdminController,
    AuthTutorController,
    AuthStudentController,
  ],
  providers: [
    AuthQueueService,
    AuthService,

    LocalStrategy,
    AdminAccessStrategy,
    TutorAccessStrategy,
    StudentAccessStrategy,
  ],
  exports: [AuthService, AuthQueueService],
})
export class AuthModule {}
