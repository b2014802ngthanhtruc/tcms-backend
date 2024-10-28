import { z } from 'zod';

export const CitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isProvided: z.boolean(),
  districts: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      wards: z
        .object({
          id: z.string().uuid(),
          name: z.string(),
        })
        .array()
        .optional(),
    })
    .array()
    .optional(),
});

export type CityResponse = z.infer<typeof CitySchema>;
