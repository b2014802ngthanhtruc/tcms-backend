import { z } from 'zod';
import { EducationalQualification } from '@prisma/client';

export const EducationalQualificationModel = z.object({
  id: z.string().uuid().trim(),
  tutorId: z.string().uuid().trim(),

  degree: z.string().trim(),
  major: z.string().trim(),
  university: z.string().trim(),
  startYear: z.string(),
  endYear: z.string(),
  certificateUrl: z.string().trim(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type EducationalQualificationEntity = EducationalQualification;
