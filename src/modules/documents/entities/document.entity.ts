import { z } from 'zod';
import { ClassEntity } from '@modules/classes/entities';
import { Document } from '@prisma/client';

export const DocumentModel = z.object({
  id: z.string().uuid().trim(),
  classId: z.string().uuid().trim(),

  docUrl: z.string().trim(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type DocumentEntity = Document & {
  class?: ClassEntity | null;
};
