import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const LoginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).max(20).trim(),
});

export class LoginDto extends createZodDto(LoginSchema) {}
