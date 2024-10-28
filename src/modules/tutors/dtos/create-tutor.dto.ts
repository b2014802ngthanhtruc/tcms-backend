import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';
import { CreateAddressSchema } from '@modules/address/dtos';
import {
  AreaExpectModel,
  EducationalQualificationModel,
  JobReferenceModel,
  TimeExpectModel,
  TutorModel,
} from '../entities';

export const CreateJobReferenceSchema = JobReferenceModel.pick({
  class: true,
  grade: true,
  description: true,
}).extend({
  subjects: z.string().uuid().trim().array(),
});

export const CreateAreaExpectSchema = AreaExpectModel.pick({
  city: true,
  district: true,
});

export const CreateEducationalQualificationSchema =
  EducationalQualificationModel.pick({
    degree: true,
    major: true,
    university: true,
    startYear: true,
    endYear: true,
    certificateUrl: true,
  });

export const CreateTimeExpectSchema = TimeExpectModel.pick({
  time: true,
  dow: true,
});

export const CreateTutorSchema = TutorModel.pick({
  userId: true,

  avatar: true,
  description: true,
  status: true,
  dob: true,
  gender: true,
  identificationId: true,
  expectSalary: true,
}).extend({
  address: CreateAddressSchema,
  jobReference: CreateJobReferenceSchema.array(),
  areaExpect: CreateAreaExpectSchema.array(),
  educationalQualification: CreateEducationalQualificationSchema,
  timeExpect: CreateTimeExpectSchema.array(),

  phone: TutorModel.shape.phone.refine((value) => {
    return isValidPhoneNumber(value);
  }),
  firstName: TutorModel.shape.firstName.transform((value) => {
    return value.toLowerCase();
  }),
  lastName: TutorModel.shape.lastName.transform((value) => {
    return value.toLowerCase();
  }),
});

export type CreateTutorDto = z.infer<typeof CreateTutorSchema>;
