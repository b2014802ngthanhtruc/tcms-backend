import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().trim().min(6).max(20),
  newPassword: z.string().trim().min(6).max(20),
});

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}
