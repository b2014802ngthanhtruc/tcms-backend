import { SUBJECT_ERROR } from 'src/content/errors';
import { ResponseFindMany } from '@common/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateSubjectDto, UpdateSubjectDto } from '../dtos';
import { SubjectEntity } from '../entities';
import { SubjectRepository } from '../repositories';

@Injectable()
export class SubjectService {
  constructor(private readonly _subjectRepository: SubjectRepository) {}

  async findAll(
    findOptions: Prisma.SubjectFindManyArgs,
  ): Promise<ResponseFindMany<SubjectEntity>> {
    findOptions.where = { ...findOptions.where, deletedAt: null };
    const subjects = await this._subjectRepository.findMany(findOptions);
    const count = await this._subjectRepository.count(findOptions.where);

    return { count, data: subjects };
  }

  async create(data: CreateSubjectDto): Promise<SubjectEntity> {
    const existedSubject = await this._subjectRepository.findOne({
      where: {
        name: data.name,
        deletedAt: null,
      },
    });
    if (existedSubject)
      throw new BadRequestException(SUBJECT_ERROR.ALREADY_EXISTS);

    const subject = await this._subjectRepository.create(data);
    return subject;
  }

  async findOne(conditions: Prisma.SubjectWhereInput): Promise<SubjectEntity> {
    const subject = await this._subjectRepository.findOne({
      where: conditions,
    });
    if (!subject) throw new NotFoundException(SUBJECT_ERROR.NOT_FOUND);
    return subject;
  }

  async update(id: string, data: UpdateSubjectDto): Promise<SubjectEntity> {
    const existedSubject = await this._subjectRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!existedSubject) throw new NotFoundException(SUBJECT_ERROR.NOT_FOUND);

    const subject = await this._subjectRepository.update({ id }, data);
    return subject;
  }

  async delete(id: string): Promise<void> {
    const existedSubject = (await this._subjectRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        classes: true,
        questions: true,
      },
    })) as SubjectEntity;
    if (!existedSubject) throw new BadRequestException(SUBJECT_ERROR.NOT_FOUND);
    // TODO: Check if subjec has any class
    if (existedSubject) await this._subjectRepository.delete({ id });
  }
}
