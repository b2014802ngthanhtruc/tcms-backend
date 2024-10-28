import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { RefreshTokenDto, TutorLoginDto, TutorRegisterDto } from '../dtos';

@Controller('auth/tutor')
export class AuthTutorController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() data: TutorRegisterDto) {
    return await this._authService.tutorRegister(data);
  }

  @Post('login')
  async login(@Body() data: TutorLoginDto) {
    return await this._authService.tutorLogin(data.userId);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return await this._authService.tutorRefreshToken(data);
  }
}
