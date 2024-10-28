import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';
import { CreateAddressSchema } from '@modules/address/dtos';
import { StudentModel } from '../entities';

export const CreateStudentSchema = StudentModel.pick({
  userId: true,

  avatar: true,
  dob: true,
  gender: true,
  grade: true,
  class: true,
  desciption: true,
  status: true,
}).extend({
  address: CreateAddressSchema,

  phone: StudentModel.shape.phone.refine((val) => {
    return isValidPhoneNumber(val);
  }),
  firstName: StudentModel.shape.firstName.transform((value) => {
    return value.toLowerCase();
  }),
  lastName: StudentModel.shape.lastName.transform((value) => {
    return value.toLowerCase();
  }),
  parentName: z
    .string()
    .trim()
    .or(z.string().min(2).max(100))
    .transform((value) => {
      console.log(value);
      return value && value.toLowerCase();
    })
    .optional(),
});

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>;
