import { z } from 'zod';

export const ListStudentProfileSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(2).max(50),
  gender: z.string(),
  grade: z.string(),
  class: z.string(),
});

export type ListStudentProfileResponseDto = z.infer<
  typeof ListStudentProfileSchema
>;
