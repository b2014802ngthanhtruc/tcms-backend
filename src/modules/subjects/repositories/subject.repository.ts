import { Injectable } from '@nestjs/common';
import { Prisma, Subject } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class SubjectRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Prisma.SubjectCreateInput): Promise<Subject> {
    const subject = await this._prismaService.subject.create({ data });
    return subject;
  }

  async findMany(conditions: Prisma.SubjectFindManyArgs): Promise<Subject[]> {
    const subjects = await this._prismaService.subject.findMany(conditions);
    return subjects;
  }

  async findOne(
    conditions: Prisma.SubjectFindFirstArgs,
  ): Promise<Subject | null> {
    const subject = await this._prismaService.subject.findFirst(conditions);
    return subject;
  }

  async update(
    conditions: Prisma.SubjectWhereUniqueInput,
    data: Prisma.SubjectUpdateInput,
  ): Promise<Subject> {
    const subject = await this._prismaService.subject.update({
      where: conditions,
      data,
    });
    return subject;
  }

  async delete(conditions: Prisma.SubjectWhereUniqueInput): Promise<void> {
    await this._prismaService.subject.update({
      where: conditions,
      data: { deletedAt: new Date() },
    });
  }

  async count(conditions: Prisma.SubjectWhereInput): Promise<number> {
    const count = await this._prismaService.subject.count({
      where: conditions,
    });
    return count;
  }
}
