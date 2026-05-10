import type {
  ContactAddressDto,
  DivisionDetailsDto,
  DivisionListItemDto,
  DivisionTextContentDto,
  ImageBannerDto,
  PagedResultDto,
} from '@/modules/divisions/api/dto';
import { mapContentFormatFromDto } from './content-format.mappers';
import type {
  DivisionAddress,
  DivisionBanner,
  DivisionDetails,
  DivisionListItem,
  DivisionListPage,
  DivisionTextContent,
} from './types';

function toTrimmedString(value: string | null | undefined): string {
  return value?.trim() ?? '';
}

function mapDivisionAddressFromDto(dto?: ContactAddressDto | null): DivisionAddress {
  return {
    street: dto?.street ?? '',
    district: dto?.district ?? '',
    city: dto?.city ?? '',
    postalCode: dto?.postalCode ?? '',
    countryId: dto?.countryId ?? null,
  };
}

function mapDivisionBannerFromDto(dto?: ImageBannerDto | null): DivisionBanner | null {
  if (!dto?.data) {
    return null;
  }

  return {
    imageBase64: dto.data,
    contentType: dto.contentType ?? '',
    fileName: dto.fileName ?? '',
  };
}

function mapDivisionTextContentFromDto(
  dto: DivisionTextContentDto,
): DivisionTextContent {
  return {
    id: dto.id,
    contentTemplateId: dto.contentTemplateId,
    contentTemplateName: dto.contentTemplateName,
    audienceId: dto.audienceId ?? null,
    audienceName: dto.audienceName ?? '',
    content: dto.content ?? '',
    format: mapContentFormatFromDto(dto.format),
  };
}

export function mapDivisionListItemDto(dto: DivisionListItemDto): DivisionListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    isActive: dto.isActive,
  };
}

export function mapDivisionListPageDto(
  dto: PagedResultDto<DivisionListItemDto>,
): DivisionListPage {
  return {
    items: dto.items.map(mapDivisionListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
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
    contactAddress: mapDivisionAddressFromDto(dto.contactAddress),
    accreditationBanner: mapDivisionBannerFromDto(dto.accreditationBanner),
    headOfficeEmail: dto.headOfficeEmail ?? '',
    headOfficeTelephoneNo: dto.headOfficeTelephoneNo ?? '',
    texts: (dto.texts ?? []).map(mapDivisionTextContentFromDto),
    version: dto.version,
  };
}
