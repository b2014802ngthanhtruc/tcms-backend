import { z } from 'zod';
import { Class, Gender, Grade, Status } from '@common/enums';
import { AddressEntity } from '@modules/address/entities';
import { Student } from '@prisma/client';

export const StudentModel = z.object({
  id: z.string().trim().uuid(),
  userId: z.string().trim().uuid(),
  addressId: z.string().trim().uuid(),

  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  fullName: z.string().trim().min(2).max(50),
  phone: z.string().trim(),
  avatar: z.string().trim().nullish(),
  parentName: z.string().trim().min(2).max(100).nullish(),
  dob: z.coerce.date(),
  gender: z.nativeEnum(Gender),
  grade: z.nativeEnum(Grade),
  class: z.nativeEnum(Class),
  desciption: z.string().trim().trim().nullish(),
  status: z.nativeEnum(Status),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type StudentEntity = Student & {
  address?: AddressEntity | null;
};
