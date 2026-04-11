import { cloneDivisionBanner } from '../lib/banner';
import { ContentFormat } from './types';
import type {
  DivisionAddress,
  DivisionBanner,
  DivisionDetails,
  DivisionFormValues,
} from './types';

export function cloneDivisionAddress(address: DivisionAddress): DivisionAddress {
  return {
    id: address.id,
    line1: address.line1,
    line2: address.line2,
    line3: address.line3,
    line4: address.line4,
    countryIsoCode: address.countryIsoCode,
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
    visaLetterNoteFormat: ContentFormat.Html,
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

export function cloneDivisionFormValues(
  values: DivisionFormValues,
): DivisionFormValues {
  return {
    name: values.name,
    isActive: values.isActive,
    websiteUrl: values.websiteUrl,
    termsAndConditions: values.termsAndConditions,
    groupsPaymentTerms: values.groupsPaymentTerms,
    visaLetterNote: values.visaLetterNote,
    visaLetterNoteFormat: values.visaLetterNoteFormat,
    address: cloneDivisionAddress(values.address),
    accreditationBanner: cloneDivisionBanner(values.accreditationBanner),
    headOfficeEmailAddress: values.headOfficeEmailAddress,
    headOfficeTelephoneNo: values.headOfficeTelephoneNo,
  };
}

function areDivisionBannersEqual(
  left: DivisionBanner | null | undefined,
  right: DivisionBanner | null | undefined,
): boolean {
  if (!left && !right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  return (
    left.imageBase64 === right.imageBase64 &&
    left.contentType === right.contentType &&
    left.fileName === right.fileName
  );
}

export function areDivisionAddressesEqual(
  left: DivisionAddress,
  right: DivisionAddress,
): boolean {
  return (
    left.id === right.id &&
    left.line1 === right.line1 &&
    left.line2 === right.line2 &&
    left.line3 === right.line3 &&
    left.line4 === right.line4 &&
    left.countryIsoCode === right.countryIsoCode
  );
}

export function areDivisionFormValuesEqual(
  left: DivisionFormValues,
  right: DivisionFormValues,
): boolean {
  return (
    left.name === right.name &&
    left.isActive === right.isActive &&
    left.websiteUrl === right.websiteUrl &&
    left.termsAndConditions === right.termsAndConditions &&
    left.groupsPaymentTerms === right.groupsPaymentTerms &&
    left.visaLetterNote === right.visaLetterNote &&
    left.visaLetterNoteFormat === right.visaLetterNoteFormat &&
    areDivisionAddressesEqual(left.address, right.address) &&
    areDivisionBannersEqual(left.accreditationBanner, right.accreditationBanner) &&
    left.headOfficeEmailAddress === right.headOfficeEmailAddress &&
    left.headOfficeTelephoneNo === right.headOfficeTelephoneNo
  );
}

export function assignDivisionFormValues(
  target: DivisionFormValues,
  source: DivisionFormValues,
): void {
  const snapshot = cloneDivisionFormValues(source);

  target.name = snapshot.name;
  target.isActive = snapshot.isActive;
  target.websiteUrl = snapshot.websiteUrl;
  target.termsAndConditions = snapshot.termsAndConditions;
  target.groupsPaymentTerms = snapshot.groupsPaymentTerms;
  target.visaLetterNote = snapshot.visaLetterNote;
  target.visaLetterNoteFormat = snapshot.visaLetterNoteFormat;
  target.address = snapshot.address;
  target.accreditationBanner = snapshot.accreditationBanner;
  target.headOfficeEmailAddress = snapshot.headOfficeEmailAddress;
  target.headOfficeTelephoneNo = snapshot.headOfficeTelephoneNo;
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
