import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const ResendCodeSchema = z.object({
  id: z.string().uuid().trim(),
});

export class ResendCodeDto extends createZodDto(ResendCodeSchema) {}
