import { z } from 'zod';
import { Address } from '@prisma/client';

export const AddressModel = z.object({
  id: z.string().uuid().trim(),

  lat: z.number().nullish(),
  lng: z.number().nullish(),
  fullAddress: z.string().trim(),
  address: z.string().trim(),
  ward: z.string().trim(),
  district: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),

  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type AddressEntity = Address;
