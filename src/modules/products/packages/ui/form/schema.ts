import { z } from 'zod';
import { ProductKind } from '@/modules/products/packages/api/dto';

const packageItemSchema = z.object({
  productKind: z.nativeEnum(ProductKind),
  productId: z.number().int().min(1),
  priceBreakdown: z.number().min(0),
});

export const packageFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  unitTypeId: z.number().nullable().refine((v) => v !== null, { message: 'Unit type is required' }),
  isActive: z.boolean(),
  description: z.string().max(2000),
  commission: z.union([z.number().min(0, 'Commission must be 0 or more'), z.literal('')]),
  ageFrom: z.union([z.number().int().min(0).max(99), z.literal('')]),
  ageTo: z.union([z.number().int().min(0).max(99), z.literal('')]),
  minimumWeeks: z.union([z.number().int().min(1), z.literal('')]),
  accountCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Account category is required' }),
  productCategoryId: z.number().nullable().refine((v) => v !== null, { message: 'Product category is required' }),
  generalLedgerCode: z.string(),
  costCentreCode: z.string(),
  closurePolicy: z.string(),
  items: z.array(packageItemSchema),
});
