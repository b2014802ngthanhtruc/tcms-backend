import { createZodDto } from '@anatine/zod-nestjs';
import { CreateTutorSchema } from '@modules/tutors/dtos';

export const TutorLoginSchema = CreateTutorSchema.pick({
  userId: true,
});

export class TutorLoginDto extends createZodDto(TutorLoginSchema) {}
