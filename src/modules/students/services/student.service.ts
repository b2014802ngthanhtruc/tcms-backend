import { STUDNET_ERROR } from 'src/content/errors/student.error';
import { Status } from '@common/enums';
import { capitalize, capitalizeWords } from '@common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateStudentDto } from '../dtos';
import { StudentEntity } from '../entities';
import { StudentRepository } from '../repositories';

@Injectable()
export class StudentService {
  constructor(private readonly _studentRepository: StudentRepository) {}

  async create(data: CreateStudentDto): Promise<StudentEntity> {
    const { address, userId, ...rest } = data;
    const fullName =
      capitalize(data.firstName) + ' ' + capitalize(data.lastName);
    const parentName = data.parentName && capitalizeWords(data.parentName);
    const student = await this._studentRepository.create({
      data: {
        ...rest,
        fullName: fullName,
        parentName: parentName,
        user: { connect: { id: userId } },
        address: {
          create: {
            ...address,
            country: address.country || 'VN',
            fullAddress: `${address.address}, ${address.ward}, ${address.district}, ${address.city}`,
          },
        },
      },
    });

    return student;
  }

  async findOne(
    conditions: Prisma.StudentFindFirstArgs,
    needToThrowError: boolean = true,
  ): Promise<StudentEntity | null> {
    const student = await this._studentRepository.findOne(conditions);

    if (!student && needToThrowError)
      throw new NotFoundException(STUDNET_ERROR.NOT_FOUND);

    return student;
  }

  async findAll(
    findOptions: Prisma.StudentFindManyArgs,
  ): Promise<StudentEntity[]> {
    const students = await this._studentRepository.findMany(findOptions);
    return students;
  }

  async getProfile(id: string, userId: string): Promise<StudentEntity> {
    const student = await this.findOne(
      {
        where: {
          id,
          userId,
          deletedAt: null,
          status: Status.ACTIVE,
        },
        include: {
          address: true,
        },
      },
      false,
    );
    if (!student) throw new NotFoundException(STUDNET_ERROR.NOT_FOUND);
    return student;
  }
}
