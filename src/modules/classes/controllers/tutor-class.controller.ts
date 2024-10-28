import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClassService } from '../services';
import { CreateClassDto } from '../dtos';
import { RequestUser } from '@common/decorators';
import { UserEntity } from '@modules/users/entities';
import { TutorAccessGuard } from '@modules/auth/guards';

@Controller('tutor/classes')
@UseGuards(TutorAccessGuard)
export class TutorClassController {
  constructor(private readonly _classService: ClassService) {}

  @Post()
  async create(@RequestUser() user: UserEntity, @Body() data: CreateClassDto) {
    return await this._classService.create(user.id, data, { isTutor: true });
  }
}
