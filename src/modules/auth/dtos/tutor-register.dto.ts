import { createZodDto } from '@anatine/zod-nestjs';
import { CreateTutorSchema } from '@modules/tutors/dtos';

export const TutorRegisterSchema = CreateTutorSchema.omit({
  status: true,
});

export class TutorRegisterDto extends createZodDto(TutorRegisterSchema) {}
