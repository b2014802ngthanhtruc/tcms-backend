import { z } from 'zod';
import { Gender, Status } from '@common/enums';
import { AddressEntity, AddressModel } from '@modules/address/entities';
import { ClassEntity } from '@modules/classes/entities';
import { SubjectModel } from '@modules/subjects/entities';
import { UserEntity } from '@modules/users/entities';
import { Tutor } from '@prisma/client';
import { AreaExpectEntity, AreaExpectModel } from './area-expect.entity';
import {
  EducationalQualificationEntity,
  EducationalQualificationModel,
} from './educational-qualification.entity';
import { JobReferenceEntity, JobReferenceModel } from './job-reference.entity';
import { TimeExpectEntity, TimeExpectModel } from './time-expect.entity';

export const TutorModel = z.object({
  id: z.string().trim().uuid(),
  userId: z.string().trim().uuid(),
  addressId: z.string().trim().uuid(),

  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  fullName: z.string().trim().min(2).max(50),
  phone: z.string().trim(),
  avatar: z.string().trim().trim().nullish(),
  dob: z.coerce.date(),
  gender: z.nativeEnum(Gender),

  identificationId: z.string().trim(),
  identificationImageFront: z.string().trim(),
  identificationImageBack: z.string().trim(),
  expectSalary: z.number(),

  description: z.string().trim().trim().nullish(),
  status: z.nativeEnum(Status),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type TutorEntity = Tutor & {
  address?: AddressEntity | null;
  user?: UserEntity | null;

  classes?: ClassEntity[] | null;
  educationalQualification?: EducationalQualificationEntity | null;
  jobReferences?: JobReferenceEntity[] | null;
  timeExpects?: TimeExpectEntity[] | null;
  areaExpects?: AreaExpectEntity[] | null;
};

export const TutorResponseSchema = TutorModel.omit({
  addressId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  email: z.string().trim().email().optional(),
  identificationImageFront: z.string().trim().nullable(),
  identificationImageBack: z.string().trim().nullable(),
  educationalQualification: EducationalQualificationModel.omit({
    tutorId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }).nullable(),
  jobReferences: JobReferenceModel.omit({
    tutorId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
    .extend({
      subjects: SubjectModel.pick({
        id: true,
        name: true,
      })
        .array()
        .nullable(),
    })
    .array()
    .nullable(),
  timeExpects: TimeExpectModel.omit({
    tutorId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
    .array()
    .nullable(),
  areaExpects: AreaExpectModel.omit({
    tutorId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
    .array()
    .nullable(),
  address: AddressModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }).nullable(),
});

export type TutorResponse = z.infer<typeof TutorResponseSchema>;
