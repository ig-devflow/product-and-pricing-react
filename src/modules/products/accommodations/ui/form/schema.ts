import { z } from 'zod';

export const accommodationFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  isActive: z.boolean(),
  description: z.string().max(2000),
});
