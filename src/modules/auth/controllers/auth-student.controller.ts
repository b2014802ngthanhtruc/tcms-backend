import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from '../services';
import {
  ListStudentProfileResponseDto,
  StudentLoginDto,
  StudentRegisterDto,
} from '../dtos';

@Controller('auth/student')
export class AuthStudentController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() data: StudentRegisterDto) {
    return await this._authService.studentRegister(data);
  }

  @Post('login')
  async login(@Body() data: StudentLoginDto) {
    return await this._authService.studentLogin(data.userId, data.studentId);
  }

  @Get(':userId/list-profiles')
  async listProfiles(
    @Param('userId') userId: string,
  ): Promise<ListStudentProfileResponseDto[]> {
    const result = await this._authService.listStudentProfiles(userId);
    console.log(result);
    return result;
  }
}
