import { z } from 'zod';
import { AreaExpect } from '@prisma/client';

export const AreaExpectModel = z.object({
  id: z.string().uuid().trim(),
  tutorId: z.string().uuid().trim(),

  city: z.string().trim(),
  district: z.string().trim(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type AreaExpectEntity = AreaExpect;
