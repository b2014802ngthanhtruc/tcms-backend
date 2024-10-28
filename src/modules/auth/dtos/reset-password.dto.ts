import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim().min(6),
  code: z
    .string()
    .length(6)
    .regex(/[0-9]{6}/)
    .trim(),
});

export class ResetPasswordDto extends createZodDto(ResetPasswordSchema) {}
