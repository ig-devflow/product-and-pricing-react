import { z } from 'zod';

export const roomFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  isActive: z.boolean(),
  accommodationId: z.number().nullable().refine((v) => v !== null, { message: 'Accommodation is required' }),
  divisionId: z.number().nullable().refine((v) => v !== null, { message: 'Division is required' }),
  maxOccupancy: z.union([z.number().int().min(1, 'Must be at least 1').max(20), z.literal('')]).refine((v) => v !== '', { message: 'Max occupancy is required' }),
  description: z.string().max(2000),
});
