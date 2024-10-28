import { createZodDto } from '@anatine/zod-nestjs';
import { CreateSubjectSchema } from './create-subject.dto';

export const UpdateSubjectSchema = CreateSubjectSchema.partial();

export class UpdateSubjectDto extends createZodDto(UpdateSubjectSchema) {}
