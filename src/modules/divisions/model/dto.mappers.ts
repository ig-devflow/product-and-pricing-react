import type {
  ContactAddressDto,
  DivisionDetailsDto,
  DivisionReportTextDto,
  DivisionSummaryDto,
  ImageFileDto,
} from '@/modules/divisions/api/dto';
import {
  buildDivisionAddressText,
  removeProtocol,
} from '@/modules/divisions/model/formatters';
import { mapContentFormatFromDto } from './content-format.mappers';
import type {
  DivisionAddress,
  DivisionBanner,
  DivisionDetails,
  DivisionListItem,
  DivisionReportText,
} from './types';

function toTrimmedString(value: string | null | undefined): string {
  return value?.trim() ?? '';
}

function mapDivisionAddressFromDto(
  dto?: ContactAddressDto | null,
): DivisionAddress {
  return {
    id: dto?.id ?? null,
    line1: dto?.line1 ?? '',
    line2: dto?.line2 ?? '',
    line3: dto?.line3 ?? '',
    line4: dto?.line4 ?? '',
    countryIsoCode: dto?.countryISOCode ?? '',
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
