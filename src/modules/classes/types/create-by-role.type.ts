import { z } from 'zod';

export const CreateByRoleSchema = z.object({
  isAdmin: z.boolean().default(false).optional(),
  isTutor: z.boolean().default(false).optional(),
  isStudent: z.boolean().default(false).optional(),
  isSubAdmin: z.boolean().default(false).optional(),
});

export type CreateByRole = z.infer<typeof CreateByRoleSchema>;
