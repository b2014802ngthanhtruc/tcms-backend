import * as bcrypt from 'bcryptjs';
import { JwtPayload, SignOptions, decode, sign, verify } from 'jsonwebtoken';
import { AUTH_ERROR, USER_ERROR } from 'src/content/errors';
import { STUDNET_ERROR } from 'src/content/errors/student.error';
import { TUTOR_ERROR } from 'src/content/errors/tutor.error';
import { Status } from '@common/enums';
import { ResponseSuccess } from '@common/types';
import { CONFIG_VAR } from '@config/config.constant';
import { StudentService } from '@modules/students/services';
import { TutorService } from '@modules/tutors/services';
import { UserEntity } from '@modules/users/entities';
import { AuthProvider } from '@modules/users/enums';
import { UserService } from '@modules/users/services';
import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ADMIN_ACCESS_TOKEN,
  ADMIN_REFRESH_TOKEN,
  STUDENT_ACCESS_TOKEN,
  STUDENT_REFRESH_TOKEN,
  SUBADMIN_ACCESS_TOKEN,
  SUBADMIN_REFRESH_TOKEN,
  TUTOR_ACCESS_TOKEN,
  TUTOR_REFRESH_TOKEN,
} from '../constants';
import {
  ChangePasswordDto,
  ChooseProfileResponseDto,
  ForgotPasswordDto,
  GetStartedDto,
  GetStartedResponseDto,
  ListStudentProfileResponseDto,
  RefreshTokenDto,
  ResendCodeDto,
  ResetPasswordDto,
  StudentRegisterDto,
  TutorRegisterDto,
  UserRegisterDto,
  VerifyEmailDto,
} from '../dtos';
import { AuthResponse, TokenPayload } from '../types';
import { AuthQueueService } from './auth-queue.service';

export type TokenType =
  | typeof ADMIN_ACCESS_TOKEN
  | typeof ADMIN_REFRESH_TOKEN
  | typeof STUDENT_ACCESS_TOKEN
  | typeof STUDENT_REFRESH_TOKEN
  | typeof TUTOR_ACCESS_TOKEN
  | typeof TUTOR_REFRESH_TOKEN
  | typeof SUBADMIN_ACCESS_TOKEN
  | typeof SUBADMIN_REFRESH_TOKEN;

@Injectable()
export class AuthService {
  private readonly _jwtKeys: {
    [ADMIN_ACCESS_TOKEN]: string;
    [ADMIN_REFRESH_TOKEN]: string;
    [STUDENT_ACCESS_TOKEN]: string;
    [STUDENT_REFRESH_TOKEN]: string;
    [TUTOR_ACCESS_TOKEN]: string;
    [TUTOR_REFRESH_TOKEN]: string;
    [SUBADMIN_ACCESS_TOKEN]: string;
    [SUBADMIN_REFRESH_TOKEN]: string;
  };

  private readonly _jwtOptions: {
    [ADMIN_ACCESS_TOKEN]: SignOptions;
    [ADMIN_REFRESH_TOKEN]: SignOptions;
    [STUDENT_ACCESS_TOKEN]: SignOptions;
    [STUDENT_REFRESH_TOKEN]: SignOptions;
    [TUTOR_ACCESS_TOKEN]: SignOptions;
    [TUTOR_REFRESH_TOKEN]: SignOptions;
    [SUBADMIN_ACCESS_TOKEN]: SignOptions;
    [SUBADMIN_REFRESH_TOKEN]: SignOptions;
  };
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
    private readonly _studentService: StudentService,
    private readonly _tutorService: TutorService,
    private readonly _authQueueService: AuthQueueService,
  ) {
    this._jwtKeys = {
      [ADMIN_ACCESS_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.ADMIN_JWT_ACCESS_SECRET,
        'default_secret',
      ),
      [ADMIN_REFRESH_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.ADMIN_JWT_REFRESH_SECRET,
        'default_secret',
      ),
      [STUDENT_ACCESS_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.STUDENT_JWT_ACCESS_SECRET,
        'default_secret',
      ),
      [STUDENT_REFRESH_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.STUDENT_JWT_REFRESH_SECRET,
        'default_secret',
      ),
      [TUTOR_ACCESS_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.TUTOR_JWT_ACCESS_SECRET,
        'default_secret',
      ),
      [TUTOR_REFRESH_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.TUTOR_JWT_REFRESH_SECRET,
        'default_secret',
      ),
      [SUBADMIN_ACCESS_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.SUBADMIN_JWT_ACCESS_SECRET,
        'default_secret',
      ),
      [SUBADMIN_REFRESH_TOKEN]: this._configService.getOrThrow(
        CONFIG_VAR.SUBADMIN_JWT_REFRESH_SECRET,
        'default_secret',
      ),
    };

    this._jwtOptions = {
      [ADMIN_ACCESS_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_ACCESS_EXPIRES_IN,
        ),
      },
      [ADMIN_REFRESH_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_REFRESH_EXPIRES_IN,
        ),
      },
      [STUDENT_ACCESS_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_ACCESS_EXPIRES_IN,
        ),
      },
      [STUDENT_REFRESH_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_REFRESH_EXPIRES_IN,
        ),
      },
      [TUTOR_ACCESS_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_ACCESS_EXPIRES_IN,
        ),
      },
      [TUTOR_REFRESH_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_REFRESH_EXPIRES_IN,
        ),
      },
      [SUBADMIN_ACCESS_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_ACCESS_EXPIRES_IN,
        ),
      },
      [SUBADMIN_REFRESH_TOKEN]: {
        expiresIn: this._configService.getOrThrow(
          CONFIG_VAR.JWT_REFRESH_EXPIRES_IN,
        ),
      },
    };
  }

  // ======================== General ========================//
  async getStarted(data: GetStartedDto): Promise<GetStartedResponseDto> {
    const user = await this._userService.findOneByConditon({
      where: {
        email: data.email,
        deletedAt: null,
        status: { not: Status.DELETED },
      },
    });
    return {
      id: user ? user.id : null,
      email: user ? user.email : data.email,
      isRegistered: !!user,
      isCompleteSignup: user?.isCompleteSignup || false,
      isVerifiedEmail: user?.isVerifiedEmail || false,
    };
  }
  async userRegister(data: UserRegisterDto): Promise<{ userId: string }> {
    const existedData = await this._userService.findOneByConditon({
      where: {
        email: data.email,
        deletedAt: null,
        status: { not: Status.DELETED },
      },
    });

    if (existedData) throw new BadRequestException(USER_ERROR.ALREADY_EXISTS);

    const code = this._generateCode();
    data.password = await this._hashPassword(data.password);

    await this._authQueueService.addSendVerifyEmailJob(data.email, code);

    const user = await this._userService.create({
      ...data,
      verifyCode: code,
      verifyCodeExpiredAt: new Date(Date.now() + 5 * 60 * 1000),
      authProvider: AuthProvider.LOCAL,
    });

    return { userId: user.id };
  }

  async verifyEmail(data: VerifyEmailDto): Promise<{ userId: string }> {
    const user = await this._userService.findOneByConditon({
      where: {
        verifyCode: data.code,
        status: Status.PENDING,
        verifiedEmailAt: null,
        isVerifiedEmail: false,
        deletedAt: null,
      },
    });

    if (
      !user ||
      (user.verifyCodeExpiredAt && user.verifyCodeExpiredAt < new Date())
    )
      throw new BadRequestException(AUTH_ERROR.VERIFY_CODE_FAILED);

    if (user.id !== data.id)
      throw new BadRequestException(USER_ERROR.NOT_FOUND);

    await this._userService.update(data.id, {
      verifyCode: null,
      status: Status.ACTIVE,
      verifyCodeExpiredAt: null,
      verifiedEmailAt: new Date(),
      isVerifiedEmail: true,
    });

    return { userId: user.id };
  }

  async resendCode(data: ResendCodeDto): Promise<ResponseSuccess> {
    const user = await this._userService.findOneByConditon({
      where: {
        id: data.id,
        verifiedEmailAt: null,
        isVerifiedEmail: false,
        status: Status.PENDING,
        deletedAt: null,
      },
    });

    if (user) {
      const code = this._generateCode();

      await this._userService.update(user.id, {
        verifyCode: code,
        verifyCodeExpiredAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      await this._authQueueService.addSendVerifyEmailJob(user.email, code);
    }

    return { success: true };
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<ResponseSuccess> {
    const user = await this._userService.findOneByConditon({
      where: {
        email: data.email,
        deletedAt: null,
        status: { notIn: [Status.DELETED, Status.BLOCKED] },
      },
    });

    if (user) {
      const code = this._generateCode();
      await this._userService.update(user.id, {
        resetPasswordCode: code,
        resetPasswordCodeExpiredAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      await this._authQueueService.addSendForgotPasswordEmailJob(
        user.email,
        code,
      );
    }

    return { success: true };
  }

  async resetPassword(data: ResetPasswordDto): Promise<ResponseSuccess> {
    const user = await this._userService.findOneByConditon({
      where: {
        email: data.email,
        deletedAt: null,
        status: { notIn: [Status.DELETED, Status.BLOCKED] },
      },
    });

    if (!user) throw new NotFoundException(USER_ERROR.NOT_FOUND);
    if (
      user.resetPasswordCode !== data.code ||
      (user.resetPasswordCodeExpiredAt &&
        user.resetPasswordCodeExpiredAt < new Date())
    )
      throw new BadRequestException(AUTH_ERROR.VERIFY_CODE_FAILED);

    await this._userService.update(user.id, {
      resetPasswordCode: null,
      resetPasswordCodeExpiredAt: null,
      password: await this._hashPassword(data.password),
    });

    return { success: true };
  }

  async changePassword(user: UserEntity, data: ChangePasswordDto) {
    const isMatch = await this._comparePassword(
      data.oldPassword,
      user.password,
    );
    if (!isMatch) throw new BadRequestException(AUTH_ERROR.PASSWORD_INCORRECT);
    const hashPassword = await this._hashPassword(data.newPassword);

    await this._userService.update(user.id, {
      password: await this._hashPassword(hashPassword),
    });
  }

  async userLogin(user: UserEntity): Promise<ChooseProfileResponseDto> {
    const result = await this._userService.findOneByConditon({
      where: {
        id: user.id,
        deletedAt: null,
        status: Status.ACTIVE,
      },
      select: {
        id: true,
        isCompleteSignup: true,
        isVerifiedEmail: true,
        students: {
          select: {
            id: true,
            fullName: true,
          },
        },
        tutor: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });
    if (!result) throw new NotFoundException(USER_ERROR.NOT_FOUND);

    return result as ChooseProfileResponseDto;
  }

  // ======================== ADMIN ========================//
  async adminLogin(user: UserEntity): Promise<AuthResponse> {
    if (!user.isAdmin)
      throw new ForbiddenException(AUTH_ERROR.FORBIDDEN_RESOURCE);
    const result = this._generateTokens(
      { id: user.id },
      ADMIN_ACCESS_TOKEN,
      ADMIN_REFRESH_TOKEN,
    );
    return result;
  }

  async adminRefreshToken(data: RefreshTokenDto): Promise<AuthResponse> {
    const token = (await this._verifyToken(
      data.refreshToken,
      ADMIN_REFRESH_TOKEN,
    )) as JwtPayload;
    const user = await this._userService.findOneById(token.id);
    if (!user.isAdmin)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);

    const accessToken = this._signPayload({ id: user.id }, ADMIN_ACCESS_TOKEN);
    const { exp: accessExp } = this._decodeToken(accessToken) as JwtPayload;
    return {
      accessToken,
      accessExp,
    };
  }

  // ======================== SUBADMIN ========================//
  async subAdminLogin(user: UserEntity): Promise<AuthResponse> {
    if (!user.isSubAdmin)
      throw new ForbiddenException(AUTH_ERROR.FORBIDDEN_RESOURCE);
    const result = this._generateTokens(
      { id: user.id },
      SUBADMIN_ACCESS_TOKEN,
      SUBADMIN_REFRESH_TOKEN,
    );
    return result;
  }

  async subAdminRefreshToken(data: RefreshTokenDto): Promise<AuthResponse> {
    const token = this._verifyToken(
      data.refreshToken,
      SUBADMIN_REFRESH_TOKEN,
    ) as JwtPayload;
    const user = await this._userService.findOneById(token.id);
    if (!user.isSubAdmin)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);

    const accessToken = this._signPayload(
      { id: user.id },
      SUBADMIN_ACCESS_TOKEN,
    );
    const { exp: accessExp } = this._decodeToken(accessToken) as JwtPayload;
    return {
      accessToken,
      accessExp,
    };
  }

  // ======================== STUDENT ========================//
  async studentRegister(
    data: StudentRegisterDto,
  ): Promise<{ studentId: string }> {
    const user = await this._userService.findOneById(data.userId);

    const student = await this._studentService.create({
      ...data,
      status: Status.ACTIVE,
    });

    if (!user.isStudent) {
      await this._userService.update(user.id, {
        isCompleteSignup: true,
        isStudent: true,
      });
    }

    return { studentId: student.id };
  }

  async studentLogin(userId: string, studentId: string): Promise<AuthResponse> {
    const user = await this._userService.findOneById(userId);
    if (!user.isStudent)
      throw new ForbiddenException(AUTH_ERROR.FORBIDDEN_RESOURCE);
    const student = await this._studentService.findOne({
      where: {
        userId: user.id,
        id: studentId,
        deletedAt: null,
        status: Status.ACTIVE,
      },
    });

    if (!student) throw new ForbiddenException(STUDNET_ERROR.NOT_FOUND);

    const result = this._generateTokens(
      { id: user.id, studentId: student.id },
      STUDENT_ACCESS_TOKEN,
      STUDENT_REFRESH_TOKEN,
    );
    return result;
  }

  async studentRefreshToken(data: RefreshTokenDto): Promise<AuthResponse> {
    const token = (await this._verifyToken(
      data.refreshToken,
      STUDENT_REFRESH_TOKEN,
    )) as JwtPayload;

    const [user, student] = await Promise.all([
      this._userService.findOneById(token.id),
      this._studentService.findOne(
        {
          where: {
            id: token.studentId,
            userId: token.id,
            deletedAt: null,
            status: Status.ACTIVE,
          },
        },
        false,
      ),
    ]);

    if (!user.isStudent)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
    if (!student) throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);

    const accessToken = this._signPayload(
      { id: user.id, studentId: student.id },
      STUDENT_ACCESS_TOKEN,
    );
    const { exp: accessExp } = this._decodeToken(accessToken) as JwtPayload;
    return {
      accessToken,
      accessExp,
    };
  }

  async listStudentProfiles(
    userId: string,
  ): Promise<ListStudentProfileResponseDto[]> {
    await this._userService.findOneById(userId);
    const students = await this._studentService.findAll({
      where: {
        userId: userId,
        deletedAt: null,
        status: Status.ACTIVE,
      },
    });

    return students.map((student) => {
      return {
        id: student.id,
        fullName: student.fullName,
        gender: student.gender,
        grade: student.grade,
        class: student.class,
      };
    });
  }

  // ======================== TUTOR ========================//
  async tutorRegister(data: TutorRegisterDto): Promise<{ tutorId: string }> {
    const user = await this._userService.findOneById(data.userId);
    const existedTutor = await this._tutorService.findOne(
      {
        where: {
          userId: user.id,
          deletedAt: null,
          status: Status.ACTIVE,
        },
      },
      true,
    );
    if (existedTutor) throw new BadGatewayException(TUTOR_ERROR.ALREADY_EXISTS);

    const tutor = await this._tutorService.create({
      ...data,
      status: Status.ACTIVE,
    });
    if (!user.isTutor) {
      await this._userService.update(user.id, {
        isCompleteSignup: true,
        isTutor: true,
      });
    }
    return { tutorId: tutor.id };
  }

  async tutorLogin(userId: string): Promise<AuthResponse> {
    const user = await this._userService.findOneById(userId);
    if (!user.isTutor)
      throw new ForbiddenException(AUTH_ERROR.FORBIDDEN_RESOURCE);
    await this._tutorService.findOne({
      where: { userId: user.id, deletedAt: null, status: Status.ACTIVE },
    });
    const result = this._generateTokens(
      { id: user.id },
      TUTOR_ACCESS_TOKEN,
      TUTOR_REFRESH_TOKEN,
    );
    return result;
  }

  async tutorRefreshToken(data: RefreshTokenDto): Promise<AuthResponse> {
    const token = (await this._verifyToken(
      data.refreshToken,
      TUTOR_REFRESH_TOKEN,
    )) as JwtPayload;
    const user = await this._userService.findOneById(token.id);
    if (!user.isTutor)
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
    const accessToken = this._signPayload({ id: user.id }, TUTOR_ACCESS_TOKEN);
    const { exp: accessExp } = this._decodeToken(accessToken) as JwtPayload;
    return {
      accessToken,
      accessExp,
    };
  }
  // ======================== PASSPORT ========================//
  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this._userService.findOneByConditon({
      where: {
        email,
        deletedAt: null,
        status: { not: Status.DELETED },
      },
    });

    if (!user) throw new BadRequestException(AUTH_ERROR.LOGIN_FAILED);
    if (!user.isVerifiedEmail)
      throw new BadRequestException(AUTH_ERROR.NOT_VERIFIED);
    const checkPassword = await this._comparePassword(password, user.password);
    if (!checkPassword) throw new BadRequestException(AUTH_ERROR.LOGIN_FAILED);

    return user;
  }
  // ================== PRIVATE ========================//
  private _generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async _hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async _comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  private _signPayload(payload: TokenPayload, type: TokenType): string {
    return sign(payload, this._jwtKeys[type], this._jwtOptions[type]);
  }

  private async _verifyToken(
    token: string,
    type: string,
  ): Promise<string | JwtPayload> {
    try {
      const decoded = verify(token, this._jwtKeys[type]);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
    }
  }

  private _decodeToken(token: string): string | JwtPayload | null {
    return decode(token);
  }

  private async _generateTokens(
    payload: TokenPayload,
    typeAccess: TokenType,
    typeRefresh: TokenType,
  ): Promise<AuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this._signPayload(payload, typeAccess),
      this._signPayload(payload, typeRefresh),
    ]);
    const { exp: accessExp } = this._decodeToken(accessToken) as JwtPayload;
    const { exp: refreshExp } = this._decodeToken(refreshToken) as JwtPayload;
    return {
      accessToken,
      accessExp: accessExp,
      refreshToken,
      refreshExp: refreshExp,
    };
  }
}
