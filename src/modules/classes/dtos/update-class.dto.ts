import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { Class } from '@common/enums';
import { CreateAddressSchema } from '@modules/address/dtos';
import { ClassModel, ScheduleModel } from '../entities';

export const UpdateClassSchema = ClassModel.pick({
  tutorId: true,
  subjectId: true,

  request: true,
  teachingMode: true,
  scope: true,
  status: true,
  startedAt: true,
  endedAt: true,
  className: true,
  paymentFrequency: true,
  quantityStudents: true,
})
  .extend({
    request: ClassModel.shape.request.min(5),
    className: ClassModel.shape.className.min(5).nullish(),
    level: z.nativeEnum(Class),
    description: z.string().trim().min(5).nullish(),
    tuiationFee: z.number().min(1).nullish(),
    quantityStudents: ClassModel.shape.quantityStudents.min(1),
    location: CreateAddressSchema.nullable(),
    schedules: ScheduleModel.pick({
      dow: true,
      duration: true,
      time: true,
    })
      .extend({
        duration: ScheduleModel.shape.duration.min(60).max(180),
      })
      .array(),
  })
  .partial()
  .superRefine((val, ctx) => {
    if (val.startedAt && val.endedAt && val.startedAt > val.endedAt) {
      ctx.addIssue({
        code: 'custom',
        path: ['startedAt'],
        message: 'Started date must be less than ended date',
      });
    }
    if (
      (val.startedAt && val.startedAt < new Date()) ||
      (val.endedAt && val.endedAt < new Date())
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['startedAt', 'endedAt'],
        message:
          'Started date and ended date must be greater than current date',
      });
    }
  });

export class UpdateClassDto extends createZodDto(UpdateClassSchema) {}
