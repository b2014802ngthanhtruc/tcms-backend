import { Strategy } from 'passport-local';
import { UserEntity } from '@modules/users/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LoginSchema } from '../dtos';
import { AuthService } from '../services';

export const LOCAL_STRATEGY = 'local-strategy';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly _authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const validateData = LoginSchema.safeParse({ email, password });
    if (validateData.error)
      throw new BadRequestException(validateData.error.errors[0].message);
    const user = await this._authService.validateUser(email, password);
    return user;
  }
}
