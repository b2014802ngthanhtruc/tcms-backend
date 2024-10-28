import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClassService } from '../services';
import { Prisma } from '@prisma/client';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { BaseQueryParamsDto } from '@common/dtos';
import { ApiPaginateResponse } from '@shared/response/dtos';
import { ClassEntity } from '../entities';
import { ResponseService } from '@shared/response/response.service';
import { Request } from 'express';

@Controller('general/classes')
export class GeneralClassController {
  constructor(private readonly _classService: ClassService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.ClassWhereInput>(
        [
          'className',
          'scope',
          'teachingMode',
          'tuitionFee',
          'status',
          'createdAt',
          'level',
        ],
        ['location.district', 'location.city', 'location.country'],
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClassEntity> {
    return await this._classService.findOne(id);
  }
}
