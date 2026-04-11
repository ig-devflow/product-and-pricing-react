import type {
  CreateDivisionRequestDto,
  UpdateDivisionRequestDto,
} from '../api/dto';
import type { DivisionFormValues, DivisionReportText } from './types';
import {
  mapContentFormatToDto,
  mapDivisionAddressToDto,
  mapDivisionBannerToDto,
  mapDivisionReportTextToDto,
} from './adapters';

export function mapFormValuesToCreateDto(
  values: DivisionFormValues,
): CreateDivisionRequestDto {
  return {
    name: values.name.trim(),
    isActive: values.isActive,
    websiteUrl: values.websiteUrl.trim(),
    termsAndConditions: values.termsAndConditions.trim(),
    groupsPaymentTerms: values.groupsPaymentTerms.trim(),
    visaLetterNote: values.visaLetterNote.trim(),
    visaLetterNoteFormat: mapContentFormatToDto(values.visaLetterNoteFormat),
    address: mapDivisionAddressToDto(values.address),
    accreditationBanner: mapDivisionBannerToDto(values.accreditationBanner),
    headOfficeEmailAddress: values.headOfficeEmailAddress.trim(),
    headOfficeTelephoneNo: values.headOfficeTelephoneNo.trim(),
    divisionReportTexts: [],
  };
}

export function mapFormValuesToUpdateDto(
  values: DivisionFormValues,
  reportTexts: DivisionReportText[] = [],
): UpdateDivisionRequestDto {
  return {
    name: values.name.trim(),
    termsAndConditions: values.termsAndConditions.trim(),
    groupsPaymentTerms: values.groupsPaymentTerms.trim(),
    isActive: values.isActive,
    websiteUrl: values.websiteUrl.trim(),
    visaLetterNote: values.visaLetterNote.trim(),
    visaLetterNoteFormat: mapContentFormatToDto(values.visaLetterNoteFormat),
    address: mapDivisionAddressToDto(values.address),
    accreditationBanner: mapDivisionBannerToDto(values.accreditationBanner),
    headOfficeEmailAddress: values.headOfficeEmailAddress.trim(),
    headOfficeTelephoneNo: values.headOfficeTelephoneNo.trim(),
    divisionReportTexts: reportTexts.map(mapDivisionReportTextToDto),
  };
}
