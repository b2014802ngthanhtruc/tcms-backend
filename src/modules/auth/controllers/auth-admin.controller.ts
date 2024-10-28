import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { RequestUser } from '@common/decorators';
import { UserEntity } from '@modules/users/entities';
import { AuthResponse } from '../types';
import { LocalAuthGuard } from '../guards';
import { RefreshTokenDto } from '../dtos';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@RequestUser() user: UserEntity): Promise<AuthResponse> {
    return this._authService.adminLogin(user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto): Promise<AuthResponse> {
    return this._authService.adminRefreshToken(data);
  }
}
