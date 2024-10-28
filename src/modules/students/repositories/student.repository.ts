import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class StudentRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Prisma.StudentCreateArgs): Promise<Student> {
    const student = await this._prismaService.student.create(data);
    return student;
  }

  async findOne(
    conditions: Prisma.StudentFindFirstArgs,
  ): Promise<Student | null> {
    const student = await this._prismaService.student.findFirst(conditions);
    return student;
  }

  async findMany(conditions: Prisma.StudentFindManyArgs): Promise<Student[]> {
    const student = await this._prismaService.student.findMany(conditions);
    return student;
  }
}
