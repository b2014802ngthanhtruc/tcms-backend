import { CreateStudentSchema } from './create-student.dto';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateStudentSchema = CreateStudentSchema.partial();

export class UpdateStudentDto extends createZodDto(UpdateStudentSchema) {}
