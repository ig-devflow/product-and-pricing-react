import type {
  ContactAddressDto,
  CreateDivisionRequestDto,
  ImageBannerDto,
  TextContentRequestDto,
  UpdateDivisionRequestDto,
} from '@/modules/divisions/api/dto';
import { ContentFormatDto } from '@/modules/divisions/api/dto';
import { ContentFormat } from './content-format';
import { mapContentFormatToDto } from './content-format.mappers';
import type {
  DivisionAddressFormValue,
  DivisionFormValues,
  DivisionTextContentFormValue,
} from './form.types';
import type { DivisionBanner } from './types';

function toNullableString(value: string): string | null {
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : null;
}

function toNullableNumber(value: string): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const numericValue = Number(trimmedValue);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function mapDivisionAddressToDto(
  address: DivisionAddressFormValue,
): ContactAddressDto | null {
  const countryId = toNullableNumber(address.countryId);
  const street = toNullableString(address.street);
  const district = toNullableString(address.district);
  const city = toNullableString(address.city);
  const postalCode = toNullableString(address.postalCode);
  const hasValue = Boolean(street || district || city || postalCode || countryId);

  if (!hasValue) {
    return null;
  }

  return {
    street,
    district,
    city,
    postalCode,
    countryId,
  };
}

function mapDivisionBannerToDto(banner: DivisionBanner | null): ImageBannerDto | null {
  if (!banner?.imageBase64) {
    return null;
  }

  return {
    data: banner.imageBase64,
    contentType: toNullableString(banner.contentType),
    fileName: toNullableString(banner.fileName),
  };
}

function mapDivisionTextContentToDto(
  text: DivisionTextContentFormValue,
): TextContentRequestDto {
  const content = toNullableString(text.content);

  return {
    contentTemplateId: Number(text.contentTemplateId),
    audienceId: toNullableNumber(text.audienceId),
    content,
    format: content
      ? mapContentFormatToDto(text.format)
      : ContentFormatDto.None,
  };
}

function buildDivisionRequestBase(values: DivisionFormValues) {
  return {
    name: values.name.trim(),
    isActive: values.isActive,
    websiteUrl: toNullableString(values.websiteUrl),
    termsAndConditions: toNullableString(values.termsAndConditions),
    groupsPaymentTerms: toNullableString(values.groupsPaymentTerms),
    contactAddress: mapDivisionAddressToDto(values.contactAddress),
    accreditationBanner: mapDivisionBannerToDto(values.accreditationBanner),
    headOfficeEmail: toNullableString(values.headOfficeEmail),
    headOfficeTelephoneNo: toNullableString(values.headOfficeTelephoneNo),
    texts: values.texts.map((text) =>
      mapDivisionTextContentToDto({
        ...text,
        format: text.format === ContentFormat.None ? ContentFormat.PlainText : text.format,
      }),
    ),
  };
}

export function mapFormValuesToCreateDto(
  values: DivisionFormValues,
): CreateDivisionRequestDto {
  return buildDivisionRequestBase(values);
}

export function mapFormValuesToUpdateDto(
  values: DivisionFormValues,
  version: string,
): UpdateDivisionRequestDto {
  return {
    ...buildDivisionRequestBase(values),
    version,
  };
}
