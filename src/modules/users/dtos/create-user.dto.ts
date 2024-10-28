import { z } from 'zod';
import { UserModel } from '../entities';

export const UserShape = UserModel.shape;
export const UserKeys = UserModel.keyof().enum;

export const CreateUserSchema = UserModel.pick({
  email: true,
  password: true,
  authProvider: true,

  isAdmin: true,
  isSubAdmin: true,
  isTutor: true,
  isStudent: true,
  isCompleteSignup: true,

  isVerifiedEmail: true,
  verifiedEmailAt: true,

  verifyCode: true,
  verifyCodeExpiredAt: true,
}).extend({
  [UserKeys.isAdmin]: UserShape.isAdmin.optional(),
  [UserKeys.isSubAdmin]: UserShape.isSubAdmin.optional(),
  [UserKeys.isTutor]: UserShape.isTutor.optional(),
  [UserKeys.isCompleteSignup]: UserShape.isCompleteSignup.optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
