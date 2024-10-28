import { createZodDto } from '@anatine/zod-nestjs';
import { UserModel } from '../entities';

export const UpdateUserSchema = UserModel.pick({
  password: true,
  authProvider: true,
  status: true,

  isAdmin: true,
  isSubAdmin: true,
  isTutor: true,
  isStudent: true,
  isCompleteSignup: true,

  isVerifiedEmail: true,
  verifiedEmailAt: true,
  verifyCode: true,
  verifyCodeExpiredAt: true,
  resetPasswordCode: true,
  resetPasswordCodeExpiredAt: true,
}).partial();

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
