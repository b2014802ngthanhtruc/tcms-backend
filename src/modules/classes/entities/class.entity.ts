import { z } from 'zod';
import { AddressEntity } from '@modules/address/entities';
import { DocumentEntity } from '@modules/documents/entities';
import { StudentEntity } from '@modules/students/entities';
import { SubjectEntity } from '@modules/subjects/entities';
import { TutorEntity } from '@modules/tutors/entities';
import { Class } from '@prisma/client';
import {
  ClassStatus,
  PaymentFrequency,
  ScopeClass,
  TeachingMode,
} from '../enums';
import { ScheduleEntity } from './schedule.entity';

export const ClassModel = z.object({
  id: z.string().uuid().trim(),
  subjectId: z.string().uuid().trim(),
  tutorId: z.string().uuid().trim(),
  addressId: z.string().uuid().trim(),

  className: z.string().trim(),
  level: z.string().trim(),
  scope: z.nativeEnum(ScopeClass),
  quantityStudents: z.number(),
  tuitionFee: z.number().nullish(),
  paymentFrequency: z.nativeEnum(PaymentFrequency),
  request: z.string().trim(),
  teachingMode: z.nativeEnum(TeachingMode),
  description: z.string().trim().nullish(),
  status: z.nativeEnum(ClassStatus),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date(),
  totalDays: z.number(),

  createdAt: z.date(),
  createdBy: z.string().uuid().trim(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type ClassEntity = Class & {
  subject?: SubjectEntity;
  location?: AddressEntity;
  tutor?: TutorEntity | null;

  students?: StudentEntity[] | null;
  schedules?: ScheduleEntity[] | null;
  documents?: DocumentEntity[] | null;
};
