import { z } from 'zod';

export const addonFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  addOnType: z.number().nullable().refine((v) => v !== null, { message: 'Add-on type is required' }),
  unitTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Unit type is required' }),
  isActive: z.boolean(),
  accountCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Account category is required' }),
  productCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Product category is required' }),
  ageFrom: z.union([z.number().int().min(0).max(99), z.literal('')]),
  ageTo: z.union([z.number().int().min(0).max(99), z.literal('')]),
  oneToOneLessonsPerWeek: z.union([z.number().int().min(1), z.literal('')]),
  generalLedgerCode: z.string(),
  costCentreCode: z.string(),
  closurePolicy: z.string(),
});
