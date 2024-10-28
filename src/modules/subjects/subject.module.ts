import { Module } from '@nestjs/common';
import {
  AdminSubjectController,
  GeneralSubjectController,
} from './controllers';
import { SubjectRepository } from './repositories';
import { SubjectService } from './services';

@Module({
  imports: [],
  controllers: [AdminSubjectController, GeneralSubjectController],
  providers: [SubjectRepository, SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
