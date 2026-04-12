import {
  ContentFormatDto,
  type ContactAddressDto,
  type CreateDivisionRequestDto,
  type DivisionDetailsDto,
  type DivisionReportTextDto,
  type DivisionSummaryDto,
  type ImageFileDto,
  type UpdateDivisionRequestDto,
} from '../api/dto';
import { buildDivisionAddressText, removeProtocol } from './formatters';
import { ContentFormat } from './types';
import type {
  DivisionAddress,
  DivisionBanner,
  DivisionDetails,
  DivisionFormValues,
  DivisionListItem,
  DivisionReportText,
} from './types';

function toTrimmedString(value: string | null | undefined): string {
  return value?.trim() ?? '';
}

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

function mapContentFormatFromDto(value: ContentFormatDto): ContentFormat {
  return value === ContentFormatDto.Html
    ? ContentFormat.Html
    : ContentFormat.PlainText;
}

function mapContentFormatToDto(value: ContentFormat): ContentFormatDto {
  return value === ContentFormat.Html
    ? ContentFormatDto.Html
    : ContentFormatDto.PlainText;
}

function mapDivisionAddressFromDto(dto?: ContactAddressDto | null): DivisionAddress {
  return {
    id: dto?.id ?? null,
    line1: dto?.line1 ?? '',
    line2: dto?.line2 ?? '',
    line3: dto?.line3 ?? '',
    line4: dto?.line4 ?? '',
    countryIsoCode: dto?.countryISOCode ?? '',
  };
}

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

function mapDivisionBannerFromDto(dto?: ImageFileDto | null): DivisionBanner | null {
  if (!dto?.image) {
    return null;
  }

  return {
    imageBase64: dto.image,
    contentType: dto.contentType ?? '',
    fileName: dto.fileName ?? '',
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

function mapDivisionReportTextFromDto(dto: DivisionReportTextDto): DivisionReportText {
  return {
    id: dto.id,
    reportTextId: dto.reportTextId,
    divisionId: dto.divisionId ?? null,
    centreId: dto.centreId ?? null,
    content: dto.content ?? '',
    format: mapContentFormatFromDto(dto.format),
    createdOn: dto.createdOn,
    createdBy: dto.createdBy ?? '',
    lastModifiedOn: dto.lastModifiedOn,
    lastModifiedBy: dto.lastModifiedBy ?? '',
    isDeleted: dto.isDeleted,
  };
}

function mapDivisionReportTextToDto(reportText: DivisionReportText): DivisionReportTextDto {
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

export function mapDivisionSummaryDto(dto: DivisionSummaryDto): DivisionListItem {
  const address = mapDivisionAddressFromDto(dto.address);
  const websiteUrl = dto.websiteUrl ?? '';

  return {
    id: dto.id,
    name: dto.name ?? '',
    isActive: dto.isActive,
    websiteUrl,
    websiteDisplayUrl: removeProtocol(websiteUrl),
    addressText: buildDivisionAddressText(address),
    banner: mapDivisionBannerFromDto(dto.accreditationBanner),
    createdBy: dto.createdBy ?? '',
    lastModifiedBy: dto.lastModifiedBy ?? '',
  };
}

export function mapDivisionDetailsDto(dto: DivisionDetailsDto): DivisionDetails {
  return {
    id: dto.id,
    name: dto.name ?? '',
    isActive: dto.isActive,
    websiteUrl: dto.websiteUrl ?? '',
    termsAndConditions: toTrimmedString(dto.termsAndConditions),
    groupsPaymentTerms: toTrimmedString(dto.groupsPaymentTerms),
    visaLetterNote: toTrimmedString(dto.visaLetterNote),
    visaLetterNoteFormat: mapContentFormatFromDto(dto.visaLetterNoteFormat),
    address: mapDivisionAddressFromDto(dto.address),
    accreditationBanner: mapDivisionBannerFromDto(dto.accreditationBanner),
    createdOn: dto.createdOn,
    createdBy: dto.createdBy ?? '',
    lastModifiedOn: dto.lastModifiedOn,
    lastModifiedBy: dto.lastModifiedBy ?? '',
    years: dto.years ?? [],
    headOfficeEmailAddress: dto.headOfficeEmailAddress ?? '',
    headOfficeTelephoneNo: dto.headOfficeTelephoneNo ?? '',
    reportTexts: (dto.divisionReportTexts ?? []).map(mapDivisionReportTextFromDto),
  };
}

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
