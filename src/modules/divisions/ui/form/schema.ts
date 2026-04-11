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
    line1: z.string().trim().min(1, requiredMessage),
    line2: z.string().trim(),
    line3: z.string().trim(),
    line4: z.string().trim(),
    countryIsoCode: z
      .string()
      .trim()
      .min(2, 'Use a 2-letter ISO code')
      .max(2, 'Use a 2-letter ISO code'),
  }),
  visaLetterNoteFormat: z.nativeEnum(ContentFormat),
  visaLetterNote: z.string().trim(),
  termsAndConditions: z.string().trim().min(1, requiredMessage),
  groupsPaymentTerms: z.string().trim().min(1, requiredMessage),
  accreditationBanner: z
    .object({
      imageBase64: z.string(),
      contentType: z.string(),
      fileName: z.string(),
    })
    .nullable(),
});

export type DivisionFormSchema = z.infer<typeof divisionFormSchema>;
