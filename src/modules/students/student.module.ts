import { Module } from '@nestjs/common';
import { StudentController } from './controllers';
import { StudentRepository } from './repositories';
import { StudentService } from './services';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentRepository, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
