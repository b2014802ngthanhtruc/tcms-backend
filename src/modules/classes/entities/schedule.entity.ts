import { z } from 'zod';
import { ClassSession, DayOfWeek } from '@common/enums';
import { Schedule } from '@prisma/client';
import { ClassEntity } from './class.entity';

export const ScheduleModel = z.object({
  id: z.string().uuid().trim(),
  classId: z.string().uuid().trim(),

  time: z.nativeEnum(ClassSession),
  dow: z.nativeEnum(DayOfWeek),
  duration: z.number(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type ScheduleEntity = Schedule & {
  class?: ClassEntity | null;
};
