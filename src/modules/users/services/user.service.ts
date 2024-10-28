import { USER_ERROR } from 'src/content/errors';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities';
import { Status } from '../enums';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this._userRepository.create({
      data: {
        ...data,
        status: Status.PENDING,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this._userRepository.update(id, {
      ...data,
    });

    return user;
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this._userRepository.findOneById(id);

    if (!user) throw new NotFoundException(USER_ERROR.NOT_FOUND);

    return user;
  }

  async findOneByConditon(
    conditions: Prisma.UserFindFirstArgs,
  ): Promise<UserEntity | null> {
    const user = await this._userRepository.findOneByConditon(conditions);

    return user ? user : null;
  }

  async findAll(findOptions: Prisma.UserFindManyArgs) {
    const users = await this._userRepository.findMany(findOptions);
    return users;
  }
}
