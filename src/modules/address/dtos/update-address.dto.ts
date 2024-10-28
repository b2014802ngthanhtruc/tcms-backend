import { AddressModel } from '../entities';
import { z } from 'zod';

export const UpdateAddressSchema = AddressModel.pick({
  lat: true,
  lng: true,
  address: true,
  ward: true,
  district: true,
  city: true,
  country: true,
}).partial();

export type UpdateAddressDto = z.infer<typeof UpdateAddressSchema>;
