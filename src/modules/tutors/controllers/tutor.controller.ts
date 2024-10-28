import { Controller, Get, UseGuards } from '@nestjs/common';
import { TutorService } from '../services';
import { RequestUser } from '@common/decorators';
import { UserEntity } from '@modules/users/entities';
import { TutorAccessGuard } from '@modules/auth/guards';

@Controller('tutors')
@UseGuards(TutorAccessGuard)
export class TutorController {
  constructor(private readonly _tutorService: TutorService) {}

  @Get('profile')
  async getProfile(@RequestUser() user: UserEntity) {
    return await this._tutorService.findProfile({ where: { userId: user.id } });
  }
}
