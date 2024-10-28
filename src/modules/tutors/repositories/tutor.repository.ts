import { Injectable } from '@nestjs/common';
import { Prisma, Tutor } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class TutorRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Prisma.TutorCreateInput): Promise<Tutor> {
    const tutor = await this._prismaService.tutor.create({ data });
    return tutor;
  }

  async findOne(conditions: Prisma.TutorFindFirstArgs): Promise<Tutor | null> {
    const tutor = await this._prismaService.tutor.findFirst(conditions);
    return tutor;
  }
}
