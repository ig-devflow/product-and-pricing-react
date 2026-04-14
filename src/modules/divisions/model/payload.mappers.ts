import type {
  ContactAddressDto,
  CreateDivisionRequestDto,
  DivisionReportTextDto,
  ImageFileDto,
  UpdateDivisionRequestDto,
} from '@/modules/divisions/api/dto';
import { mapContentFormatToDto } from './content-format.mappers';
import type { DivisionFormValues } from './form.types';
import type { DivisionAddress, DivisionBanner, DivisionReportText } from './types';

function mapDivisionAddressToDto(address: DivisionAddress): ContactAddressDto | null {
  const hasValue =
    address.line1 ||
    address.line2 ||
    address.line3 ||
    address.line4 ||
    address.countryIsoCode;

  if (!hasValue) {
    return null;
  }

  return {
    id: address.id,
    line1: address.line1.trim(),
    line2: address.line2.trim(),
    line3: address.line3.trim(),
    line4: address.line4.trim(),
    countryISOCode: address.countryIsoCode.trim().toUpperCase(),
  };
}

function mapDivisionBannerToDto(banner: DivisionBanner | null): ImageFileDto | null {
  if (!banner?.imageBase64) {
    return null;
  }

  return {
    image: banner.imageBase64,
    contentType: banner.contentType,
    fileName: banner.fileName,
  };
}

function mapDivisionReportTextToDto(
  reportText: DivisionReportText,
): DivisionReportTextDto {
  return {
    id: reportText.id,
    reportTextId: reportText.reportTextId,
    divisionId: reportText.divisionId,
    centreId: reportText.centreId,
    content: reportText.content,
    format: mapContentFormatToDto(reportText.format),
    createdOn: reportText.createdOn,
    createdBy: reportText.createdBy,
    lastModifiedOn: reportText.lastModifiedOn,
    lastModifiedBy: reportText.lastModifiedBy,
    isDeleted: reportText.isDeleted,
  };
}

function buildDivisionRequestBase(values: DivisionFormValues) {
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
  };
}

export function mapFormValuesToCreateDto(
  values: DivisionFormValues,
): CreateDivisionRequestDto {
  return {
    ...buildDivisionRequestBase(values),
    divisionReportTexts: [],
  };
}

export function mapFormValuesToUpdateDto(
  values: DivisionFormValues,
  reportTexts: DivisionReportText[] = [],
): UpdateDivisionRequestDto {
  return {
    ...buildDivisionRequestBase(values),
    divisionReportTexts: reportTexts.map(mapDivisionReportTextToDto),
  };
}
