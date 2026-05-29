import { z } from 'zod';

export const packageFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  isActive: z.boolean(),
  divisionId: z.number().nullable().refine((v) => v !== null, { message: 'Division is required' }),
  description: z.string().max(2000),
  courseId: z.number().nullable(),
  accommodationId: z.number().nullable(),
  roomId: z.number().nullable(),
  addonIds: z.array(z.number()),
  transferIds: z.array(z.number()),
});
