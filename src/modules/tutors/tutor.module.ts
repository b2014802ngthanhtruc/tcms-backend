import { Module } from '@nestjs/common';
import { TutorController } from './controllers';
import { TutorRepository } from './repositories';
import { TutorService } from './services';

@Module({
  imports: [],
  controllers: [TutorController],
  providers: [TutorRepository, TutorService],
  exports: [TutorService],
})
export class TutorModule {}
