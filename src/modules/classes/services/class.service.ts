import { CLASS_ERROR } from 'src/content/errors';
import { Class, Status } from '@common/enums';
import { ResponseFindMany } from '@common/types';
import { StudentService } from '@modules/students/services';
import { SubjectService } from '@modules/subjects/services';
import { TutorService } from '@modules/tutors/services';
import { UserEntity } from '@modules/users/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateClassDto, UpdateClassDto } from '../dtos';
import { ClassEntity } from '../entities';
import { ClassStatus } from '../enums';
import { ClassRepository } from '../repositories';
import { CreateByRole } from '../types';

@Injectable()
export class ClassService {
  constructor(
    private readonly _classRepository: ClassRepository,
    private readonly _tutorService: TutorService,
    private readonly _subjectService: SubjectService,
    private readonly _studentService: StudentService,
  ) {}

  async create(
    userId: string,
    data: CreateClassDto,
    role: CreateByRole,
  ): Promise<ClassEntity> {
    const {
      schedules,
      startedAt,
      endedAt,
      location,
      className,
      subjectId,
      tutorId,
      ...rest
    } = data;
    const [tutor, student] = await Promise.all([
      role.isTutor
        ? this._tutorService.findOne({
            where: { userId: userId, deletedAt: null, status: Status.ACTIVE },
          })
        : Promise.resolve(null),
      role.isStudent
        ? this._studentService.findOne({
            where: { userId: userId, deletedAt: null, status: Status.ACTIVE },
          })
        : Promise.resolve(null),
      tutorId
        ? this._tutorService.findOne({
            where: { id: tutorId, deletedAt: null, status: Status.ACTIVE },
          })
        : Promise.resolve(null),
    ]);

    const createdBy = student?.id ?? tutor?.id ?? userId;
    const selectedTutorId = tutor ? tutor.id : tutorId;

    const subject = await this._subjectService.findOne({
      id: subjectId,
      deletedAt: null,
    });
    const createdClassName = className ?? subject.name;
    const totalDaysofWeek = schedules.length;
    const totalDays = this._calculateTeachingDays(
      startedAt,
      endedAt,
      totalDaysofWeek,
    );

    const newClass = await this._classRepository.create(
      {
        ...rest,
        level: Class[data.level],
        className: createdClassName,
        startedAt,
        endedAt,
        totalDays,
        createdBy,
        status: ClassStatus.NEW,
        location: location && {
          create: {
            ...location,
            country: location.country || 'VN',
            fullAddress: `${location.address}, ${location.ward}, ${location.district}, ${location.city}`,
          },
        },
        ...(selectedTutorId && {
          tutor: {
            connect: { id: selectedTutorId },
          },
        }),
        subject: { connect: { id: subjectId } },
        schedules: {
          createMany: {
            data: schedules.map((schedule) => schedule),
          },
        },
      },
      {
        subject: true,
        tutor: true,
        location: true,
        schedules: true,
      },
    );

    // Test crons

    return newClass;
  }

  async findAll(
    findOptions: Prisma.ClassFindManyArgs,
  ): Promise<ResponseFindMany<ClassEntity>> {
    findOptions.where = { ...findOptions.where, deletedAt: null };

    const classes = await this._classRepository.findMany({
      ...findOptions,
      include: {
        subject: true,
        tutor: true,
        location: true,
      },
    });
    const count = await this._classRepository.count(findOptions.where);

    return { count, data: classes };
  }

  async findOne(id: string): Promise<ClassEntity> {
    const classRoom = await this._classRepository.findOne(
      { id },
      {
        subject: true,
        tutor: true,
        location: true,
        schedules: true,
        documents: true,
        exams: true,
        payment: true,
        studentOfClasses: true,
      },
    );
    if (!classRoom) throw new NotFoundException(CLASS_ERROR.NOT_FOUND);
    return classRoom;
  }

  async update(
    user: UserEntity,
    id: string,
    data: UpdateClassDto,
    role: CreateByRole,
  ): Promise<ClassEntity> {
    const {
      tutorId,
      subjectId,
      schedules,
      location,
      className,
      endedAt,
      startedAt,
      ...rest
    } = data;
    const [classroom, tutor, student, subject] = await Promise.all([
      this.findOne(id),
      role.isTutor
        ? this._tutorService.findOne({
            where: {
              userId: user.id,
              deletedAt: null,
              status: Status.ACTIVE,
            },
          })
        : Promise.resolve(null),
      role.isStudent
        ? this._studentService.findOne({
            where: {
              userId: user.id,
              deletedAt: null,
              status: Status.ACTIVE,
            },
          })
        : Promise.resolve(null),
      subjectId
        ? this._subjectService.findOne({ id: subjectId })
        : Promise.resolve(null),
      tutorId
        ? this._tutorService.findOne({
            where: { id: tutorId, deletedAt: null, status: Status.ACTIVE },
          })
        : Promise.resolve(null),
    ]);
    if (!classroom) throw new NotFoundException(CLASS_ERROR.NOT_FOUND);
    if (
      (tutor && classroom.createdBy !== tutor.id) ||
      (student && classroom.createdBy !== student.id)
    )
      throw new NotFoundException(CLASS_ERROR.NOT_FOUND);

    const totalDayofWeek = schedules?.length || 0;

    const selectedTutorId = tutor ? undefined : tutorId;
    const updateClassName =
      className ?? subject?.name ?? classroom.subject?.name;
    const totalDays =
      startedAt && endedAt
        ? this._calculateTeachingDays(startedAt, endedAt, totalDayofWeek)
        : classroom.totalDays;

    const updatedClass = await this._classRepository.update(
      { id },
      {
        ...rest,
        className: updateClassName,
        startedAt,
        endedAt,
        totalDays,
        ...(selectedTutorId && {
          tutor: {
            connect: { id: selectedTutorId },
          },
        }),
        ...(subject && { subject: { connect: { id: subjectId } } }),
        ...(location && {
          location: {
            update: {
              ...location,
              fullAddress: `${location.address}, ${location.ward}, ${location.district}, ${location.city}`,
            },
          },
        }),
        ...(schedules && {
          schedules: {
            createMany: {
              data: schedules.map((schedule) => schedule),
            },
          },
        }),
      },
    );

    return updatedClass;
  }

  private _calculateTeachingDays(
    startedAt: Date,
    endedAt: Date,
    teachingDaysOfWeek: number,
  ): number {
    const timeDiff = endedAt.getTime() - startedAt.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Tổng số ngày giữa hai mốc thời gian

    const fullWeeks = Math.floor(totalDays / 7); // Số tuần đầy đủ giữa hai ngày
    const teachingDaysInFullWeeks = fullWeeks * teachingDaysOfWeek; // Số ngày dạy trong các tuần đầy đủ

    return teachingDaysInFullWeeks; // Chỉ trả về số ngày dạy trong các tuần đầy đủ
  }
}
