import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from '../services';
import { RequestUser } from '@common/decorators';
import { UserEntity } from '@modules/users/entities';
import { CreateClassDto } from '../dtos';
import { ClassEntity } from '../entities';
import { AdminAccessAuthGuard } from '@modules/auth/guards';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { Prisma } from '@prisma/client';
import { BaseQueryParamsDto } from '@common/dtos';
import { ResponseService } from '@shared/response/response.service';
import { Request } from 'express';
import { ApiPaginateResponse } from '@shared/response/dtos';

@Controller('admin/classes')
@UseGuards(AdminAccessAuthGuard)
export class AdminClassController {
  constructor(private readonly _classService: ClassService) {}

  @Post()
  async create(
    @RequestUser() user: UserEntity,
    @Body() data: CreateClassDto,
  ): Promise<ClassEntity> {
    return this._classService.create(user.id, data, { isAdmin: true });
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.ClassWhereInput>(
        ['className', 'scope', 'teachingMode', 'tuitionFee', 'status'],
        ['address.district', 'address.city', 'address.country'],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParamsDto<Prisma.ClassWhereInput>,
  ): Promise<ApiPaginateResponse<ClassEntity>> {
    const { findOptions, ...rest } = query;
    const { count, data } = await this._classService.findAll(findOptions);
    return ResponseService.paginateResponse<any>({
      count,
      data,
      query: rest,
      req,
    });
  }
}
