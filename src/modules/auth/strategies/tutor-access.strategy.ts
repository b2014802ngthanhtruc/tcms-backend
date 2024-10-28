import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_ERROR } from 'src/content/errors';
import { CONFIG_VAR } from '@config/config.constant';
import { UserEntity } from '@modules/users/entities';
import { UserService } from '@modules/users/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtAccessPayload } from '../types';

export const TUTOR_ACCESS_STRATEGY = 'tutor-access-strategy';
@Injectable()
export class TutorAccessStrategy extends PassportStrategy(
  Strategy,
  TUTOR_ACCESS_STRATEGY,
) {
  constructor(
    configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(CONFIG_VAR.TUTOR_JWT_ACCESS_SECRET),
    });
  }

  async validate(payload: JwtAccessPayload): Promise<UserEntity> {
    console.log('payload', payload);
    const user = await this._userService.findOneById(payload.id);
    if (!user.isTutor)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
    return user;
  }
}
