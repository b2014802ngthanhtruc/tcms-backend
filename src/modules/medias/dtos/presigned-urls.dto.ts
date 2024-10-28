import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const PresignedUrlsValidator = z.object({
  urls: z
    .array(
      z.object({
        key: z.string().trim(),
        type: z.string().trim(),
      }),
    )
    .min(1)
    .max(20),
});

export class PresignedUrlsDto extends createZodDto(PresignedUrlsValidator) {}
