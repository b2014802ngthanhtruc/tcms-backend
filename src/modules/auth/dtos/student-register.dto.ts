import { createZodDto } from '@anatine/zod-nestjs';
import { CreateStudentSchema } from '@modules/students/dtos';

export const StudentRegisterSchema = CreateStudentSchema.omit({
  status: true,
});

export class StudentRegisterDto extends createZodDto(StudentRegisterSchema) {}
