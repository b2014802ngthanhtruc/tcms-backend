import { z } from 'zod';
import { Class, Grade } from '@common/enums';
import { SubjectEntity } from '@modules/subjects/entities';
import { JobReference } from '@prisma/client';

export const JobReferenceModel = z.object({
  id: z.string().uuid().trim(),
  tutorId: z.string().uuid().trim(),

  grade: z.nativeEnum(Grade),
  class: z.nativeEnum(Class),
  description: z.string().trim().nullish(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type JobReferenceEntity = JobReference & {
  subjects?: SubjectEntity[] | null;
};
