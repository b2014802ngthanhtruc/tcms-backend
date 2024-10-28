import { RequestUser } from '@common/decorators';
import {
  ForgotPasswordDto,
  GetStartedDto,
  ResendCodeDto,
  ResetPasswordDto,
  UserRegisterDto,
  VerifyEmailDto,
} from '../dtos';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from '@modules/users/entities';

@Controller('auth/general')
export class AuthGeneralController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() data: UserRegisterDto) {
    return await this._authService.userRegister(data);
  }

  @Post('verify-email')
  async verifyEmail(@Body() data: VerifyEmailDto) {
    return await this._authService.verifyEmail(data);
  }

  @Post('resend-code')
  async resendCode(@Body() data: ResendCodeDto) {
    return await this._authService.resendCode(data);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    return await this._authService.forgotPassword(data);
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return await this._authService.resetPassword(data);
  }

  @Post('get-started')
  async getStarted(@Body() data: GetStartedDto) {
    return await this._authService.getStarted(data);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@RequestUser() user: UserEntity) {
    return await this._authService.userLogin(user);
  }
}
