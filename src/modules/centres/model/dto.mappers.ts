import { mapContentFormatFromDto } from '@/modules/divisions/model/content-format.mappers';
import type {
  AddressDto,
  CentreBankDetailsDto,
  CentreContactDto,
  CentreContactInfoDto,
  CentreDetailsDto,
  CentreListItemDto,
  CentreTextContentDto,
  ImageFileDto,
  PagedResultDto,
} from '../api/dto';
import { formatCentreDate } from './helpers';
import type {
  CentreAddress,
  CentreBankDetails,
  CentreContact,
  CentreContactInfo,
  CentreDetails,
  CentreImageFile,
  CentreListItem,
  CentreListPage,
  CentreTextContent,
} from './types';

function mapAddressFromDto(dto: AddressDto | null | undefined): CentreAddress {
  return {
    street: dto?.street ?? '',
    district: dto?.district ?? '',
    city: dto?.city ?? '',
    postalCode: dto?.postalCode ?? '',
    countryId: dto?.countryId ?? null,
  };
}

function mapImageFileFromDto(dto: ImageFileDto | null | undefined): CentreImageFile | null {
  if (!dto?.data) return null;
  return {
    base64: dto.data,
    contentType: dto.contentType ?? '',
    fileName: dto.fileName ?? '',
  };
}

function mapContactInfoFromDto(dto: CentreContactInfoDto): CentreContactInfo {
  return {
    generalEmail: dto.generalEmail ?? '',
    accommodationEmail: dto.accommodationEmail ?? '',
    telephone: dto.telephone ?? '',
    emergencyTelephone: dto.emergencyTelephone ?? '',
    transferEmergencyTelephone: dto.transferEmergencyTelephone ?? '',
    brandColor: dto.brandColor ?? '',
    contactAddress: mapAddressFromDto(dto.contactAddress),
    logoImage: mapImageFileFromDto(dto.logoImage),
  };
}

function mapBankDetailsFromDto(dto: CentreBankDetailsDto): CentreBankDetails {
  return {
    beneficiaryName: dto.beneficiaryName ?? '',
    accountNumber: dto.accountNumber ?? '',
    bankName: dto.bankName ?? '',
    iban: dto.iban ?? '',
    swiftCode: dto.swiftCode ?? '',
    branchCode: dto.branchCode ?? '',
    abaRoutingNo: dto.abaRoutingNo ?? '',
    achAba: dto.achAba ?? '',
    intermediaryBankName: dto.intermediaryBankName ?? '',
    intermediarySwiftCode: dto.intermediarySwiftCode ?? '',
    bankAddress: mapAddressFromDto(dto.bankAddress),
    beneficiaryBankAddress: mapAddressFromDto(dto.beneficiaryBankAddress),
    intermediaryBankAddress: mapAddressFromDto(dto.intermediaryBankAddress),
  };
}

function mapContactFromDto(dto: CentreContactDto): CentreContact {
  return {
    contactType: dto.contactType as CentreContact['contactType'],
    name: dto.name ?? '',
    email: dto.email ?? '',
    signatureImage: mapImageFileFromDto(dto.signatureImage),
  };
}

function mapTextContentFromDto(dto: CentreTextContentDto): CentreTextContent {
  return {
    id: dto.id,
    contentTemplateId: dto.contentTemplateId,
    contentTemplateName: dto.contentTemplateName ?? '',
    audienceId: dto.audienceId ?? null,
    audienceName: dto.audienceName ?? null,
    content: dto.content ?? '',
    format: mapContentFormatFromDto(dto.format),
  };
}

export function mapCentreListItemFromDto(dto: CentreListItemDto): CentreListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    code: dto.code ?? '',
    isActive: dto.isActive,
    isPhysicalCentre: dto.isPhysicalCentre,
    city: dto.city ?? '',
    countryId: dto.countryId,
    createdAt: dto.createdAt ?? '',
    createdByName: dto.createdByName ?? '',
    updatedAt: dto.updatedAt ?? '',
    updatedByName: dto.updatedByName ?? '',
  };
}

export function mapCentreListPageFromDto(
  dto: PagedResultDto<CentreListItemDto>,
): CentreListPage {
  return {
    items: dto.items.map(mapCentreListItemFromDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapCentreDetailsFromDto(dto: CentreDetailsDto): CentreDetails {
  return {
    id: dto.id,
    name: dto.name ?? '',
    code: dto.code ?? '',
    currencyId: dto.currencyId,
    printFormat: dto.printFormat as CentreDetails['printFormat'],
    isActive: dto.isActive,
    isPhysicalCentre: dto.isPhysicalCentre,
    contactInfo: mapContactInfoFromDto(dto.contactInfo),
    legalInfo: {
      schoolSponsorshipNumber: dto.legalInfo?.schoolSponsorshipNumber ?? '',
      vatNumber: dto.legalInfo?.vatNumber ?? '',
      registrationNumber: dto.legalInfo?.registrationNumber ?? '',
      vatExemptionNumber: dto.legalInfo?.vatExemptionNumber ?? '',
      chequePayableTo: dto.legalInfo?.chequePayableTo ?? '',
    },
    operationalRatios: {
      guarantees: dto.operationalRatios?.guarantees ?? null,
      individualsRatio: dto.operationalRatios?.individualsRatio ?? null,
      staffingRatio: dto.operationalRatios?.staffingRatio ?? null,
      emptyBeds: dto.operationalRatios?.emptyBeds ?? null,
    },
    bankDetails: mapBankDetailsFromDto(dto.bankDetails),
    contacts: (dto.contacts ?? []).map(mapContactFromDto),
    texts: (dto.texts ?? []).map(mapTextContentFromDto),
    version: dto.version ?? '',
    createdAt: dto.createdAt ?? '',
    createdByName: dto.createdByName ?? '',
    updatedAt: dto.updatedAt ?? '',
    updatedByName: dto.updatedByName ?? '',
  };
}

export function formatCentreAuditText(
  createdAt: string,
  createdByName: string,
  updatedAt: string,
  updatedByName: string,
): { createdAtText: string; updatedAtText: string } {
  return {
    createdAtText: createdAt ? `${formatCentreDate(createdAt)}${createdByName ? ` by ${createdByName}` : ''}` : '',
    updatedAtText: updatedAt ? `${formatCentreDate(updatedAt)}${updatedByName ? ` by ${updatedByName}` : ''}` : '',
  };
}
