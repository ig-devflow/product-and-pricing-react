import { z } from 'zod';

export const transferFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  isActive: z.boolean(),
  divisionId: z.number().nullable().refine((v) => v !== null, { message: 'Division is required' }),
  description: z.string().max(2000),
});
