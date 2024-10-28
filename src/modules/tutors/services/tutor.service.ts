import { TUTOR_ERROR } from 'src/content/errors/tutor.error';
import {
  Class,
  ClassSession,
  DayOfWeek,
  Gender,
  Grade,
  Status,
} from '@common/enums';
import { capitalize } from '@common/utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTutorDto } from '../dtos';
import { TutorEntity, TutorResponse } from '../entities';
import { TutorRepository } from '../repositories';

@Injectable()
export class TutorService {
  constructor(private readonly _tutorRepository: TutorRepository) {}

  async create(data: CreateTutorDto): Promise<TutorEntity> {
    const {
      address,
      areaExpect,
      educationalQualification,
      jobReference,
      userId,
      timeExpect,
      ...rest
    } = data;
    console.log('data', data);
    const fullName =
      capitalize(data.firstName) + ' ' + capitalize(data.lastName);
    const tutor = await this._tutorRepository.create({
      ...rest,
      fullName: fullName,
      user: { connect: { id: userId } },
      address: {
        create: {
          ...address,
          country: address.country || 'VN',
          fullAddress: `${address.address}, ${address.ward}, ${address.district}, ${address.city}`,
        },
      },
      educationalQualification: {
        create: educationalQualification,
      },
      areaExpects: {
        create: areaExpect,
      },
      timeExpects: {
        createMany: {
          data: timeExpect,
        },
      },
      jobReference: {
        create: jobReference.map((job) => ({
          grade: job.grade,
          class: job.class,
          description: job.description,
          subjectExpects: {
            createMany: {
              data: job.subjects.map((subjectId) => ({
                subjectId,
              })),
            },
          },
        })),
      },
    });

    return tutor;
  }

  async findOne(
    conditions: Prisma.TutorFindFirstArgs,
    isRegister: boolean = false,
  ): Promise<TutorEntity | null> {
    const tutor = await this._tutorRepository.findOne(conditions);

    if (!tutor && !isRegister)
      throw new BadRequestException(TUTOR_ERROR.NOT_FOUND);

    return tutor;
  }

  async findProfile(
    conditions: Prisma.TutorFindFirstArgs,
  ): Promise<TutorResponse> {
    const tutor = await this._tutorRepository.findOne({
      where: conditions.where,
      select: {
        id: true,
        userId: true,
        fullName: true,
        firstName: true,
        lastName: true,
        avatar: true,
        address: true,
        dob: true,
        expectSalary: true,
        description: true,
        gender: true,
        phone: true,
        status: true,
        identificationId: true,
        identificationImageFront: true,
        identificationImageBack: true,
        user: {
          select: {
            email: true,
          },
        },
        educationalQualification: {
          select: {
            id: true,
            major: true,
            university: true,
            degree: true,
            startYear: true,
            endYear: true,
            certificateUrl: true,
          },
        },
        areaExpects: {
          select: {
            city: true,
            district: true,
          },
        },
        timeExpects: {
          select: {
            id: true,
            time: true,
            dow: true,
          },
        },
        jobReference: {
          select: {
            id: true,
            class: true,
            grade: true,
            description: true,
            subjectExpects: {
              select: {
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!tutor) throw new BadRequestException(TUTOR_ERROR.NOT_FOUND);

    const {
      user,
      jobReferences,
      educationalQualification,
      timeExpects,
      areaExpects,
      address,
      ...rest
    } = tutor as TutorEntity;

    return {
      id: rest.id,
      userId: rest.userId,
      fullName: rest.fullName,
      firstName: rest.firstName,
      lastName: rest.lastName,
      avatar: rest.avatar,
      email: user?.email,
      dob: rest.dob,
      expectSalary: rest.expectSalary,
      description: rest.description,
      identificationId: rest.identificationId,
      identificationImageFront: rest.identificationImageFront,
      identificationImageBack: rest.identificationImageBack,
      phone: rest.phone,
      gender: Gender[rest.gender],
      status: Status[rest.status],
      areaExpects: areaExpects
        ? areaExpects.map((area) => ({
            id: area.id,
            city: area.city,
            district: area.district,
          }))
        : null,
      educationalQualification: educationalQualification
        ? {
            id: educationalQualification.id,
            major: educationalQualification.major,
            university: educationalQualification.university,
            degree: educationalQualification.degree,
            startYear: educationalQualification.startYear,
            endYear: educationalQualification.endYear,
            certificateUrl: educationalQualification.certificateUrl,
          }
        : null,
      jobReferences: jobReferences
        ? jobReferences.map((job) => ({
            id: job.id,
            class: Class[job.class],
            grade: Grade[job.grade],
            description: job.description,
            subjects: job.subjects
              ? job.subjects.map((subject) => ({
                  id: subject.id,
                  name: subject.name,
                }))
              : null,
          }))
        : null,
      timeExpects: timeExpects
        ? timeExpects.map((time) => ({
            id: time.id,
            time: ClassSession[time.time],
            dow: DayOfWeek[time.dow],
          }))
        : null,
      address: address
        ? {
            city: address.city,
            district: address.district,
            address: address.address,
            ward: address.ward,
            country: address.country,
            fullAddress: address.fullAddress,
          }
        : null,
    };
  }
}
