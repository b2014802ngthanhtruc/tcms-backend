import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const PresignedUrlValidator = z.object({
  key: z.string().trim(),
  type: z.string().trim(),
});

export class PresignedUrlDto extends createZodDto(PresignedUrlValidator) {}
