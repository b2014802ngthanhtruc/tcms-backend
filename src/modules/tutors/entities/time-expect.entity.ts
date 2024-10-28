import { z } from 'zod';
import { ClassSession, DayOfWeek } from '@common/enums';
import { TimeExpect } from '@prisma/client';

export const TimeExpectModel = z.object({
  id: z.string().uuid().trim(),
  tutorId: z.string().uuid().trim(),

  time: z.nativeEnum(ClassSession),
  dow: z.nativeEnum(DayOfWeek),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type TimeExpectEntity = TimeExpect;
