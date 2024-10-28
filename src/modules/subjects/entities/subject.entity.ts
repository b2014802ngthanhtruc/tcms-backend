import { z } from 'zod';
import { ClassEntity } from '@modules/classes/entities';
import { Subject } from '@prisma/client';

export const SubjectModel = z.object({
  id: z.string().uuid().trim(),

  name: z.string().trim(),
  description: z.string().trim().nullish(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type SubjectEntity = Subject & {
  classes?: ClassEntity[];
};
