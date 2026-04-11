import { z } from 'zod';
import { ContentFormat } from '@/modules/divisions/model/division';

const requiredMessage = 'This field is required';

export const divisionFormSchema = z.object({
  name: z.string().trim().min(1, requiredMessage),
  isActive: z.boolean(),
  websiteUrl: z.string().trim().url('Enter a valid URL'),
  headOfficeEmailAddress: z.string().trim().email('Enter a valid email'),
  headOfficeTelephoneNo: z.string().trim().min(1, requiredMessage),
  address: z.object({
    id: z.number().nullable(),
    line1: z.string().trim(),
    line2: z.string().trim(),
    line3: z.string().trim(),
    line4: z.string().trim(),
    countryIsoCode: z
      .string()
      .trim()
      .refine((value) => !value || value.length === 2, {
        message: 'Use a 2-letter ISO code',
      }),
  }),
  visaLetterNoteFormat: z.nativeEnum(ContentFormat),
  visaLetterNote: z.string().trim(),
  termsAndConditions: z.string().trim(),
  groupsPaymentTerms: z.string().trim(),
  accreditationBanner: z
    .object({
      imageBase64: z.string(),
      contentType: z.string(),
      fileName: z.string(),
    })
    .nullable(),
});

export type DivisionFormSchema = z.infer<typeof divisionFormSchema>;
