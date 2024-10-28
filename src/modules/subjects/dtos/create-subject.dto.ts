import { createZodDto } from '@anatine/zod-nestjs';
import { SubjectModel } from '../entities';

export const CreateSubjectSchema = SubjectModel.pick({
  name: true,
  description: true,
});

export class CreateSubjectDto extends createZodDto(CreateSubjectSchema) {}
