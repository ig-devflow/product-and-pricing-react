import { z } from 'zod';
import { ContentFormat } from '@/modules/divisions/model/content-format';

const requiredMessage = 'This field is required';

function isValidEmail(value: string): boolean {
  return !value || z.email().safeParse(value).success;
}

const textContentSchema = z.object({
  textId: z.number().nullable(),
  contentTemplateId: z.string().trim().min(1, requiredMessage),
  audienceId: z.string().trim(),
  content: z.string().trim().min(1, requiredMessage),
  format: z.nativeEnum(ContentFormat),
});

export const divisionFormSchema = z
  .object({
    name: z.string().trim().min(1, requiredMessage),
    isActive: z.boolean(),
    websiteUrl: z.string().trim().url('Enter a valid URL'),
    headOfficeEmail: z
      .string()
      .trim()
      .refine(isValidEmail, { message: 'Enter a valid email' }),
    headOfficeTelephoneNo: z.string().trim(),
    contactAddress: z
      .object({
        street: z.string().trim(),
        district: z.string().trim(),
        city: z.string().trim(),
        postalCode: z.string().trim(),
        countryId: z.string().trim(),
      })
      .superRefine((address, ctx) => {
        const hasAddressValue = Boolean(
          address.street ||
            address.district ||
            address.city ||
            address.postalCode ||
            address.countryId,
        );

        if (hasAddressValue && !address.countryId) {
          ctx.addIssue({
            code: 'custom',
            path: ['countryId'],
            message: 'Country is required when address is provided',
          });
        }
      }),
    termsAndConditions: z.string().trim(),
    groupsPaymentTerms: z.string().trim(),
    accreditationBanner: z
      .object({
        imageBase64: z.string(),
        contentType: z.string(),
        fileName: z.string(),
      })
      .nullable(),
    texts: z.array(textContentSchema),
  })
  .superRefine((values, ctx) => {
    const keys = new Set<string>();

    values.texts.forEach((text, index) => {
      const templateId = text.contentTemplateId.trim();

      if (!templateId) {
        return;
      }

      const audienceId = text.audienceId.trim() || 'all';
      const key = `${templateId}:${audienceId}`;

      if (keys.has(key)) {
        ctx.addIssue({
          code: 'custom',
          path: ['texts', index, 'audienceId'],
          message: 'Duplicate text content for this template and audience',
        });
        return;
      }

      keys.add(key);
    });
  });

export type DivisionFormSchema = z.infer<typeof divisionFormSchema>;
