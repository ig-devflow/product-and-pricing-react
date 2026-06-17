import { z } from 'zod';

export const accommodationFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  accommodationTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Accommodation type is required' }),
  isActive: z.boolean(),
  minimumStayInWeeks: z.union([z.number().int().min(1, 'Must be at least 1 week'), z.literal('')]).refine((v) => v !== '', { message: 'Minimum stay is required' }),
  ageFrom: z.union([z.number().int().min(0).max(99), z.literal('')]),
  ageTo: z.union([z.number().int().min(0).max(99), z.literal('')]),
  isCommitted: z.boolean(),
  isNonCommitted: z.boolean(),
});
