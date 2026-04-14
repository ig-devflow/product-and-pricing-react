import { ContentFormat } from './content-format';
import type { DivisionFormValues } from './form.types';
import type { DivisionAddress, DivisionBanner, DivisionDetails } from './types';

function cloneDivisionAddress(address: DivisionAddress): DivisionAddress {
  return {
    id: address.id,
    line1: address.line1,
    line2: address.line2,
    line3: address.line3,
    line4: address.line4,
    countryIsoCode: address.countryIsoCode,
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

export function createEmptyDivisionFormValues(): DivisionFormValues {
  return {
    name: '',
    isActive: true,
    websiteUrl: '',
    termsAndConditions: '',
    groupsPaymentTerms: '',
    visaLetterNote: '',
    visaLetterNoteFormat: ContentFormat.PlainText,
    address: {
      id: null,
      line1: '',
      line2: '',
      line3: '',
      line4: '',
      countryIsoCode: '',
    },
    accreditationBanner: null,
    headOfficeEmailAddress: '',
    headOfficeTelephoneNo: '',
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
    visaLetterNote: details.visaLetterNote,
    visaLetterNoteFormat: details.visaLetterNoteFormat,
    address: cloneDivisionAddress(details.address),
    accreditationBanner: cloneDivisionBanner(details.accreditationBanner),
    headOfficeEmailAddress: details.headOfficeEmailAddress,
    headOfficeTelephoneNo: details.headOfficeTelephoneNo,
  };
}
