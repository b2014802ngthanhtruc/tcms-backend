import { Injectable } from '@nestjs/common';
import { Class, Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class ClassRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(
    data: Prisma.ClassCreateInput,
    include?: Prisma.ClassInclude,
  ): Promise<Class> {
    const classRoom = await this._prismaService.class.create({ data, include });
    return classRoom;
  }

  async findMany(findOptions: Prisma.ClassFindManyArgs): Promise<Class[]> {
    const classRooms = await this._prismaService.class.findMany(findOptions);
    return classRooms;
  }

  async findOne(
    conditions: Prisma.ClassWhereUniqueInput,
    include?: Prisma.ClassInclude,
  ): Promise<Class | null> {
    const classRoom = await this._prismaService.class.findUnique({
      where: conditions,
      include,
    });
    return classRoom;
  }

  async update(
    conditions: Prisma.ClassWhereUniqueInput,
    data: Prisma.ClassUpdateInput,
  ): Promise<Class> {
    const classRoom = await this._prismaService.class.update({
      where: conditions,
      data,
    });
    return classRoom;
  }

  async count(conditions: Prisma.ClassWhereInput): Promise<number> {
    const count = await this._prismaService.class.count({
      where: conditions,
    });
    return count;
  }

  async delete(conditions: Prisma.ClassWhereUniqueInput): Promise<Class> {
    const classRoom = await this._prismaService.class.delete({
      where: conditions,
    });
    return classRoom;
  }
}
