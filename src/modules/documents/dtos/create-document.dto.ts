import { z } from 'zod';
import { DocumentModel } from '../entities';

export const CreateDocumentSchema = DocumentModel.pick({
  classId: true,
  docUrl: true,
});

export type CreateDocumentDto = z.infer<typeof CreateDocumentSchema>;
