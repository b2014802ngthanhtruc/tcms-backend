import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubjectService } from '../services';
import { DirectFilterPipe } from '@chax-at/prisma-filter';
import { Prisma } from '@prisma/client';
import { BaseQueryParamsDto } from '@common/dtos';
import { ApiPaginateResponse } from '@shared/response/dtos';
import { ResponseService } from '@shared/response/response.service';
import { Request } from 'express';
import { SubjectEntity } from '../entities';

@Controller('general/subjects')
export class GeneralSubjectController {
  constructor(private readonly _subjectService: SubjectService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Req() req: Request,
    @Query(
      new DirectFilterPipe<any, Prisma.SubjectWhereInput>(
        ['name', 'id', 'createdAt'],
        [],
        [{ createdAt: 'desc' }],
      ),
    )
    query: BaseQueryParamsDto<Prisma.SubjectWhereInput>,
  ): Promise<ApiPaginateResponse<SubjectEntity>> {
    const { findOptions, ...rest } = query;
    findOptions.where = { ...query.findOptions.where, deletedAt: null };
    const { count, data } = await this._subjectService.findAll(
      query.findOptions,
    );

    return ResponseService.paginateResponse<any>({
      count,
      data,
      req,
      query: rest,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubjectEntity> {
    return await this._subjectService.findOne({ id });
  }
}
