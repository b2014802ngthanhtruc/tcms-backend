import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { Status } from '../enums';

@Injectable()
export class UserRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateArgs): Promise<User> {
    const user = await this._prismaService.user.create(data);

    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this._prismaService.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this._prismaService.user.findUnique({
      where: {
        id,
        deletedAt: null,
        status: { notIn: [Status.DELETED, Status.BLOCKED] },
      },
    });

    return user ?? null;
  }

  async findOneByConditon(
    conditions: Prisma.UserFindFirstArgs,
  ): Promise<User | null> {
    const user = await this._prismaService.user.findFirst(conditions);

    return user ?? null;
  }

  async findMany(conditions: Prisma.UserFindManyArgs): Promise<User[]> {
    const users = await this._prismaService.user.findMany(conditions);

    return users;
  }
}
