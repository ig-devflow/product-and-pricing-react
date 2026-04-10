import { z } from 'zod';
import { DivisionVisaLetterNoteFormat } from '@/modules/divisions/model/division';

const requiredMessage = 'This field is required';

export const divisionFormSchema = z.object({
  name: z.string().trim().min(1, requiredMessage),
  websiteUrl: z.string().trim().url('Enter a valid URL'),
  headOfficeEmailAddress: z.string().trim().email('Enter a valid email'),
  headOfficeTelephoneNo: z.string().trim().min(1, requiredMessage),
  addressLine1: z.string().trim().min(1, requiredMessage),
  addressLine2: z.string().trim(),
  addressLine3: z.string().trim(),
  addressLine4: z.string().trim(),
  countryISOCode: z
    .string()
    .trim()
    .min(2, 'Use a 2-letter ISO code')
    .max(2, 'Use a 2-letter ISO code'),
  visaLetterNoteFormat: z.nativeEnum(DivisionVisaLetterNoteFormat),
  visaLetterNote: z.string().trim(),
  termsAndConditions: z.string().trim().min(1, requiredMessage),
  groupsPaymentTerms: z.string().trim().min(1, requiredMessage),
});

export type DivisionFormSchema = z.infer<typeof divisionFormSchema>;
