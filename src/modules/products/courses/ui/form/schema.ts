import { z } from 'zod';

const optionalInt = z.union([z.number().int().min(0), z.literal('')]);

export const courseFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Name must be 120 characters or fewer'),
  isActive: z.boolean(),
  courseLanguageId: z
    .number()
    .nullable()
    .refine((v) => v !== null, { message: 'Language is required' }),
  courseIntensityId: z
    .number()
    .nullable()
    .refine((v) => v !== null, { message: 'Intensity is required' }),
  unitTypeId: z
    .number()
    .nullable()
    .refine((v) => v !== null, { message: 'Unit type is required' }),
  accountCategoryId: z
    .number()
    .nullable()
    .refine((v) => v !== null, { message: 'Account category is required' }),
  productCategoryId: z
    .number()
    .nullable()
    .refine((v) => v !== null, { message: 'Product category is required' }),
  ageFrom: optionalInt,
  ageTo: optionalInt,
  minimumWeeks: z.union([z.number().int().min(1, 'Must be at least 1'), z.literal('')]),
  generalLedgerCode: z.string().max(50, 'Max 50 characters'),
  costCentreCode: z.string().max(50, 'Max 50 characters'),
  closurePolicy: z.string().max(2000, 'Max 2000 characters'),
});
