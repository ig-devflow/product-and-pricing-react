import { z } from 'zod';

export const transferFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  transferTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Transfer type is required' }),
  transferPortId: z.number().nullable().refine((v) => v !== null, { message: 'Transfer port is required' }),
  unitTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Unit type is required' }),
  timeFrom: z.string(),
  timeTo: z.string(),
  isActive: z.boolean(),
  accountCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Account category is required' }),
  productCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Product category is required' }),
  generalLedgerCode: z.string(),
  costCentreCode: z.string(),
  closurePolicy: z.string(),
});
