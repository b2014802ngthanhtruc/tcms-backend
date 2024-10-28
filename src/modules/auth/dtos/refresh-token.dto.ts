import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().trim(),
});

export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}
