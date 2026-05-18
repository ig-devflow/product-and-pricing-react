import { z } from 'zod';
import { ContentFormat } from '@/modules/divisions/model/content-format';
import { PrintFormat } from '@/modules/centres/model/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_RE = /^\+?[0-9\s\-().]{7,20}$/;
const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
const ALLOWED_IMAGE_MIMES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'] as const;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export { ALLOWED_IMAGE_MIMES, MAX_IMAGE_BYTES };

const addressSchema = z
  .object({
    street: z.string().trim().max(200, 'Street must be 200 characters or fewer.'),
    district: z.string().trim().max(200, 'District must be 200 characters or fewer.'),
    city: z.string().trim().max(200, 'City must be 200 characters or fewer.'),
    postalCode: z.string().trim().max(200, 'Postal code must be 200 characters or fewer.'),
    countryId: z.string().trim(),
  })
  .superRefine((addr, ctx) => {
    const anySet = [addr.street, addr.district, addr.city, addr.postalCode].some((v) => v.trim());
    if (anySet && !addr.countryId) {
      ctx.addIssue({
        code: 'custom',
        path: ['countryId'],
        message: 'Country is required when any address field is set.',
      });
    }
  });

const imageFileSchema = z
  .object({
    base64: z.string(),
    contentType: z.string(),
    fileName: z.string(),
  })
  .nullable()
  .superRefine((img, ctx) => {
    if (!img) return;
    if (img.contentType && !(ALLOWED_IMAGE_MIMES as readonly string[]).includes(img.contentType)) {
      ctx.addIssue({ code: 'custom', message: 'Use a PNG, JPEG, WebP, or SVG file.' });
    }
  });

export const centreStep1Schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Centre name is required.')
    .max(200, 'Centre name must be 200 characters or fewer.'),
  code: z
    .string()
    .trim()
    .min(1, 'Centre code is required.')
    .max(200, 'Centre code must be 200 characters or fewer.'),
  currencyId: z.string().min(1, 'Pick a currency.'),
  printFormat: z
    .union([z.literal(PrintFormat.A4), z.literal(PrintFormat.Letter), z.literal('')])
    .refine((v) => v !== '', { message: 'Pick a print format.' }),
  isActive: z.boolean(),
  isPhysicalCentre: z.boolean(),
});

export const centreStep2Schema = z.object({
  generalEmail: z
    .string()
    .trim()
    .max(256, 'Email must be 256 characters or fewer.')
    .refine((v) => !v || EMAIL_RE.test(v), { message: 'Enter a valid email address.' }),
  accommodationEmail: z
    .string()
    .trim()
    .max(256, 'Email must be 256 characters or fewer.')
    .refine((v) => !v || EMAIL_RE.test(v), { message: 'Enter a valid email address.' }),
  telephone: z
    .string()
    .trim()
    .refine((v) => !v || TEL_RE.test(v), { message: 'Use 7–20 digits with an optional country code.' }),
  emergencyTelephone: z
    .string()
    .trim()
    .refine((v) => !v || TEL_RE.test(v), { message: 'Use 7–20 digits with an optional country code.' }),
  transferEmergencyTelephone: z
    .string()
    .trim()
    .refine((v) => !v || TEL_RE.test(v), { message: 'Use 7–20 digits with an optional country code.' }),
  brandColor: z
    .string()
    .trim()
    .refine((v) => !v || HEX_RE.test(v), { message: 'Enter a hex color like #FF0000 or #F00.' }),
  contactAddress: addressSchema,
  logoImage: imageFileSchema,
});

export const centreStep3Schema = z.object({
  schoolSponsorshipNumber: z.string().trim().max(200, 'Sponsorship number must be 200 characters or fewer.'),
  vatNumber: z.string().trim().max(200, 'VAT number must be 200 characters or fewer.'),
  registrationNumber: z.string().trim().max(200, 'Registration number must be 200 characters or fewer.'),
  vatExemptionNumber: z.string().trim().max(200, 'VAT exemption must be 200 characters or fewer.'),
  chequePayableTo: z.string().trim().max(200, 'Cheque payable to must be 200 characters or fewer.'),
  guarantees: z
    .string()
    .trim()
    .refine((v) => !v || Number.isFinite(Number(v)), { message: 'Enter a number.' }),
  individualsRatio: z
    .string()
    .trim()
    .refine((v) => !v || Number.isFinite(Number(v)), { message: 'Enter a number.' }),
  staffingRatio: z
    .string()
    .trim()
    .refine((v) => !v || Number.isFinite(Number(v)), { message: 'Enter a number.' }),
  emptyBeds: z
    .string()
    .trim()
    .refine((v) => !v || Number.isFinite(Number(v)), { message: 'Enter a number.' }),
});

export const centreStep4Schema = z.object({
  beneficiaryName: z
    .string()
    .trim()
    .min(1, 'Beneficiary name is required.')
    .max(200, 'Beneficiary name must be 200 characters or fewer.'),
  accountNumber: z
    .string()
    .trim()
    .min(1, 'Account number is required.')
    .max(200, 'Account number must be 200 characters or fewer.'),
  bankName: z
    .string()
    .trim()
    .min(1, 'Bank name is required.')
    .max(200, 'Bank name must be 200 characters or fewer.'),
  iban: z.string().trim().max(50, 'IBAN must be 50 characters or fewer.'),
  swiftCode: z.string().trim().max(50, 'SWIFT must be 50 characters or fewer.'),
  branchCode: z.string().trim().max(50, 'Branch code must be 50 characters or fewer.'),
  abaRoutingNo: z.string().trim().max(50, 'ABA routing must be 50 characters or fewer.'),
  achAba: z.string().trim().max(50, 'ACH ABA must be 50 characters or fewer.'),
  intermediaryBankName: z.string().trim().max(100, 'Intermediary bank must be 100 characters or fewer.'),
  intermediarySwiftCode: z.string().trim().max(100, 'Intermediary SWIFT must be 100 characters or fewer.'),
  bankAddress: addressSchema,
  beneficiaryBankAddress: addressSchema,
  intermediaryBankAddress: addressSchema,
});

const contactFormSchema = z.object({
  contactType: z
    .union([z.literal(1), z.literal(2), z.literal('')])
    .refine((v) => v !== '', { message: 'Pick a contact role.' }),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(200, 'Name must be 200 characters or fewer.'),
  email: z
    .string()
    .trim()
    .refine((v) => !v || EMAIL_RE.test(v), { message: 'Enter a valid email address.' }),
  signatureImage: imageFileSchema,
});

const textContentFormSchema = z
  .object({
    textId: z.number().nullable(),
    contentTemplateId: z.string().min(1, 'Pick a template.'),
    audienceId: z.string().trim(),
    content: z.string().trim().max(10000, 'Content must be 10,000 characters or fewer.'),
    format: z.nativeEnum(ContentFormat),
  })
  .superRefine((t, ctx) => {
    const hasContent = t.content.trim().length > 0;
    if (hasContent && t.format === ContentFormat.None) {
      ctx.addIssue({ code: 'custom', path: ['format'], message: 'Pick a format when content is provided.' });
    }
    if (!hasContent && t.format !== ContentFormat.None) {
      ctx.addIssue({ code: 'custom', path: ['content'], message: 'Add content or clear the format.' });
    }
  });

export const centreStep5Schema = z
  .object({
    contacts: z.array(contactFormSchema),
    texts: z.array(textContentFormSchema),
  })
  .superRefine((values, ctx) => {
    const seenContactTypes = new Set<number>();
    values.contacts.forEach((c, i) => {
      if (c.contactType !== '') {
        if (seenContactTypes.has(c.contactType)) {
          ctx.addIssue({
            code: 'custom',
            path: ['contacts', i, 'contactType'],
            message: 'This contact role is already used.',
          });
        }
        seenContactTypes.add(c.contactType);
      }
    });

    const seenTextPairs = new Set<string>();
    values.texts.forEach((t, i) => {
      if (!t.contentTemplateId) return;
      const key = `${t.contentTemplateId}::${t.audienceId.trim() || 'all'}`;
      if (seenTextPairs.has(key)) {
        ctx.addIssue({
          code: 'custom',
          path: ['texts', i, 'contentTemplateId'],
          message: 'This template + audience combination already exists.',
        });
      }
      seenTextPairs.add(key);
    });
  });

export const STEP_SCHEMAS = [
  centreStep1Schema,
  centreStep2Schema,
  centreStep3Schema,
  centreStep4Schema,
  centreStep5Schema,
] as const;

export type CentreStep1Schema = z.infer<typeof centreStep1Schema>;
export type CentreStep2Schema = z.infer<typeof centreStep2Schema>;
export type CentreStep3Schema = z.infer<typeof centreStep3Schema>;
export type CentreStep4Schema = z.infer<typeof centreStep4Schema>;
export type CentreStep5Schema = z.infer<typeof centreStep5Schema>;
