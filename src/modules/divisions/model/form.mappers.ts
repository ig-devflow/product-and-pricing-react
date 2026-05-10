import { ContentFormat } from './content-format';
import type {
  DivisionAddressFormValue,
  DivisionFormValues,
  DivisionTextContentFormValue,
} from './form.types';
import type { DivisionAddress, DivisionBanner, DivisionDetails } from './types';

function cloneDivisionAddress(address: DivisionAddress): DivisionAddressFormValue {
  return {
    street: address.street,
    district: address.district,
    city: address.city,
    postalCode: address.postalCode,
    countryId: address.countryId ? String(address.countryId) : '',
  };
}

function cloneDivisionBanner(
  banner: DivisionBanner | null,
): DivisionBanner | null {
  if (!banner) {
    return null;
  }

  return {
    imageBase64: banner.imageBase64,
    contentType: banner.contentType,
    fileName: banner.fileName,
  };
}

function mapDivisionTextToFormValue(
  text: DivisionDetails['texts'][number],
): DivisionTextContentFormValue {
  return {
    textId: text.id,
    contentTemplateId: String(text.contentTemplateId),
    audienceId: text.audienceId ? String(text.audienceId) : '',
    content: text.content,
    format: text.format === ContentFormat.None ? ContentFormat.PlainText : text.format,
  };
}

export function createEmptyDivisionFormValues(): DivisionFormValues {
  return {
    name: '',
    isActive: true,
    websiteUrl: '',
    termsAndConditions: '',
    groupsPaymentTerms: '',
    contactAddress: {
      street: '',
      district: '',
      city: '',
      postalCode: '',
      countryId: '',
    },
    accreditationBanner: null,
    headOfficeEmail: '',
    headOfficeTelephoneNo: '',
    texts: [],
  };
}

export function createEmptyTextContentFormValue(): DivisionTextContentFormValue {
  return {
    textId: null,
    contentTemplateId: '',
    audienceId: '',
    content: '',
    format: ContentFormat.PlainText,
  };
}

export function mapDivisionDetailsToFormValues(
  details: DivisionDetails,
): DivisionFormValues {
  return {
    name: details.name,
    isActive: details.isActive,
    websiteUrl: details.websiteUrl,
    termsAndConditions: details.termsAndConditions,
    groupsPaymentTerms: details.groupsPaymentTerms,
    contactAddress: cloneDivisionAddress(details.contactAddress),
    accreditationBanner: cloneDivisionBanner(details.accreditationBanner),
    headOfficeEmail: details.headOfficeEmail,
    headOfficeTelephoneNo: details.headOfficeTelephoneNo,
    texts: details.texts.map(mapDivisionTextToFormValue),
  };
}
