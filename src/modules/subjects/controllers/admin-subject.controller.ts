import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from '../services';
import { CreateSubjectDto, UpdateSubjectDto } from '../dtos';
import { SubjectEntity } from '../entities';
import { AdminAccessAuthGuard } from '@modules/auth/guards';

@Controller('admin/subjects')
@UseGuards(AdminAccessAuthGuard)
export class AdminSubjectController {
  constructor(private readonly _subjectService: SubjectService) {}

  @Post()
  async create(@Body() data: CreateSubjectDto): Promise<SubjectEntity> {
    return await this._subjectService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateSubjectDto,
  ): Promise<SubjectEntity> {
    return await this._subjectService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this._subjectService.delete(id);
  }
}
