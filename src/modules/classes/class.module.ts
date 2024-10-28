import { StudentModule } from '@modules/students/student.module';
import { SubjectModule } from '@modules/subjects/subject.module';
import { TutorModule } from '@modules/tutors/tutor.module';
import { Module } from '@nestjs/common';
import {
  AdminClassController,
  GeneralClassController,
  TutorClassController,
} from './controllers';
import { ClassRepository } from './repositories';
import { ClassService } from './services';

@Module({
  imports: [StudentModule, SubjectModule, TutorModule],
  controllers: [
    AdminClassController,
    GeneralClassController,
    TutorClassController,
  ],
  providers: [ClassRepository, ClassService],
  exports: [ClassService],
})
export class ClassModule {}
