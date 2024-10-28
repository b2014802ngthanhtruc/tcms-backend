import { UserModel } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const ForgotPasswordSchema = UserModel.pick({
  email: true,
});

export class ForgotPasswordDto extends createZodDto(ForgotPasswordSchema) {}
