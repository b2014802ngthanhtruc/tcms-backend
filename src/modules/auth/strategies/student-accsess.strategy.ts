import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_ERROR } from 'src/content/errors';
import { Status } from '@common/enums';
import { CONFIG_VAR } from '@config/config.constant';
import { StudentEntity } from '@modules/students/entities';
import { StudentService } from '@modules/students/services';
import { UserService } from '@modules/users/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtAccessPayload } from '../types';

export const STUDENT_ACCESS_STRATEGY = 'student-access-strategy';
@Injectable()
export class StudentAccessStrategy extends PassportStrategy(
  Strategy,
  STUDENT_ACCESS_STRATEGY,
) {
  constructor(
    configService: ConfigService,
    private readonly _userService: UserService,
    private readonly _studentService: StudentService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(
        CONFIG_VAR.STUDENT_JWT_ACCESS_SECRET,
      ),
    });
  }

  async validate(payload: JwtAccessPayload): Promise<StudentEntity> {
    const user = await this._userService.findOneById(payload.id);
    const student = await this._studentService.findOne(
      {
        where: {
          id: payload.studentId,
          userId: payload.id,
          deletedAt: null,
          status: Status.ACTIVE,
        },
      },
      false,
    );
    if (!user.isStudent || !student)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);

    return student;
  }
}
