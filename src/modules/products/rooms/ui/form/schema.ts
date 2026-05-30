import { z } from 'zod';

export const roomFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  unitTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Unit type is required' }),
  isActive: z.boolean(),
  occupyRoom: z.boolean(),
  roomTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Room type is required' }),
  boardTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Board type is required' }),
  bathroomTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Bathroom type is required' }),
  roomGradeId: z.number().nullable().refine((v) => v !== null, { message: 'Room grade is required' }),
  accountCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Account category is required' }),
  productCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Product category is required' }),
  generalLedgerCode: z.string(),
  costCentreCode: z.string(),
  closurePolicy: z.string(),
});
