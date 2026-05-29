import { z } from 'zod';

export const courseFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Name must be 120 characters or fewer'),
  isActive: z.boolean(),
  divisionId: z.number().nullable().refine((v) => v !== null, { message: 'Division is required' }),
  lessonsPerWeek: z.union([z.number().int().min(1, 'Must be at least 1').max(50), z.literal('')]).refine((v) => v !== '', { message: 'Lessons per week is required' }),
  minutesPerLesson: z.union([z.number().int().min(1, 'Must be at least 1').max(240), z.literal('')]).refine((v) => v !== '', { message: 'Minutes per lesson is required' }),
  minAge: z.union([z.number().int().min(0, 'Must be 0 or more').max(99), z.literal('')]).refine((v) => v !== '', { message: 'Min age is required' }),
  maxAge: z.union([z.number().int().min(0, 'Must be 0 or more').max(99), z.literal('')]).refine((v) => v !== '', { message: 'Max age is required' }),
  description: z.string().max(2000, 'Description must be 2000 characters or fewer'),
});
