import { z } from 'zod';
import { StudentModel } from '@modules/students/entities';
import { TutorModel } from '@modules/tutors/entities';
import { UserModel } from '@modules/users/entities';

export const ChooseProfileSchema = UserModel.pick({
  id: true,
  isVerifiedEmail: true,
  isCompleteSignup: true,
}).extend({
  students: StudentModel.pick({
    id: true,
    fullName: true,
  })
    .array()
    .nullable()
    .optional(),
  tutor: TutorModel.pick({
    id: true,
    fullName: true,
  })
    .nullable()
    .optional(),
});

export type ChooseProfileResponseDto = z.infer<typeof ChooseProfileSchema>;
