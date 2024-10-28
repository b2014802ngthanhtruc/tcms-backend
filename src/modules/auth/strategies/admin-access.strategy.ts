import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_ERROR } from 'src/content/errors/auth.error';
import { CONFIG_VAR } from '@config/config.constant';
import { UserEntity } from '@modules/users/entities';
import { UserService } from '@modules/users/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtAccessPayload } from '../types';

export const ADMIN_ACCESS_STRATEGY = 'admin-access-strategy';
@Injectable()
export class AdminAccessStrategy extends PassportStrategy(
  Strategy,
  ADMIN_ACCESS_STRATEGY,
) {
  constructor(
    configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(CONFIG_VAR.ADMIN_JWT_ACCESS_SECRET),
    });
  }

  async validate(payload: JwtAccessPayload): Promise<UserEntity> {
    const user = await this._userService.findOneById(payload.id);
    if (!user.isAdmin)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);

    return user;
  }
}
