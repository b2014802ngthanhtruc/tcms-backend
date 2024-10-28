import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const StudentLogin = z.object({
  userId: z.string().trim().uuid(),
  studentId: z.string().trim().uuid(),
});

export class StudentLoginDto extends createZodDto(StudentLogin) {}
