import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const VeriifyEmailSchema = z.object({
  id: z.string().uuid().trim(),
  code: z.string().length(6).trim(),
});

export class VerifyEmailDto extends createZodDto(VeriifyEmailSchema) {}
