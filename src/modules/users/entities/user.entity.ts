import { z } from 'zod';
import { StudentEntity } from '@modules/students/entities';
import { User } from '@prisma/client';
import { AuthProvider, Status } from '../enums';

export const UserModel = z.object({
  id: z.string().uuid().trim(),

  email: z.string().email().trim(),
  password: z.string().trim().min(8),
  authProvider: z.nativeEnum(AuthProvider),
  status: z.nativeEnum(Status),

  isAdmin: z.boolean().default(false).optional(),
  isSubAdmin: z.boolean().default(false).optional(),
  isTutor: z.boolean().default(false).optional(),
  isStudent: z.boolean().default(false).optional(),
  isCompleteSignup: z.boolean().default(false).optional(),

  isVerifiedEmail: z.boolean().default(false).optional(),
  verifiedEmailAt: z.date().nullish(),

  verifyCode: z.string().nullish(),
  verifyCodeExpiredAt: z.date().nullish(),
  resetPasswordCode: z.string().nullish(),
  resetPasswordCodeExpiredAt: z.date().nullish(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type UserEntity = User & {
  students?: StudentEntity[] | null;
};
