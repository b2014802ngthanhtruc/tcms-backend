import { UserModel } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UserRegisterSchema = UserModel.pick({
  email: true,
  password: true,
});

export class UserRegisterDto extends createZodDto(UserRegisterSchema) {}
