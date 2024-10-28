import { z } from 'zod';
import { AddressModel } from '../entities';

export const CreateAddressSchema = AddressModel.pick({
  lat: true,
  lng: true,
  address: true,
  ward: true,
  district: true,
  city: true,
  country: true,
}).extend({
  country: AddressModel.shape.country.default('VN').optional(),
});

export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;
