import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from '../services';
import { RequestUser } from '@common/decorators';
import { StudentEntity } from '../entities';
import { StudentAccessGuard } from '@modules/auth/guards';

@Controller('students')
@UseGuards(StudentAccessGuard)
export class StudentController {
  constructor(private readonly _studentService: StudentService) {}

  @Get('profile')
  async getProfile(@RequestUser() student: StudentEntity) {
    return await this._studentService.getProfile(student.id, student.userId);
  }
}
