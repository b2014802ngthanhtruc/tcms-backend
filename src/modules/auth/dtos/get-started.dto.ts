import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const GetStartedSchema = z.object({
  email: z.string().email().trim(),
});

export class GetStartedDto extends createZodDto(GetStartedSchema) {}

export const GetStartedResponseSchema = z.object({
  id: z.string().uuid().trim().nullable(),
  email: z.string().email().trim(),
  isRegistered: z.boolean(),
  isVerifiedEmail: z.boolean(),
  isCompleteSignup: z.boolean(),
});

export type GetStartedResponseDto = z.infer<typeof GetStartedResponseSchema>;
