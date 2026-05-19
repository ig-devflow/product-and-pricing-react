import type { ContentFormatDto } from '@/modules/divisions/api/dto'

export type { ContentFormatDto }

export interface PagedResultDto<TItem> {
  items: TItem[]
  totalCount: number
  page: number
  pageSize: number
}

export interface AddressDto {
  street: string | null
  district: string | null
  city: string | null
  postalCode: string | null
  countryId: number | null
}

export interface ImageFileDto {
  data: string | null
  contentType: string | null
  fileName: string | null
}

export interface CentreContactInfoDto {
  generalEmail: string | null
  accommodationEmail: string | null
  telephone: string | null
  emergencyTelephone: string | null
  transferEmergencyTelephone: string | null
  brandColor: string | null
  contactAddress: AddressDto | null
  logoImage: ImageFileDto | null
}

export interface CentreLegalInfoDto {
  schoolSponsorshipNumber: string | null
  vatNumber: string | null
  registrationNumber: string | null
  vatExemptionNumber: string | null
  chequePayableTo: string | null
}

export interface CentreOperationalRatiosDto {
  guarantees: number | null
  individualsRatio: number | null
  staffingRatio: number | null
  emptyBeds: number | null
}

export interface CentreBankDetailsDto {
  beneficiaryName: string
  accountNumber: string
  bankName: string
  iban: string | null
  swiftCode: string | null
  branchCode: string | null
  abaRoutingNo: string | null
  achAba: string | null
  bankAddress: AddressDto
  beneficiaryBankAddress: AddressDto
  intermediaryBankAddress: AddressDto
  intermediaryBankName: string | null
  intermediarySwiftCode: string | null
}

export interface CentreContactDto {
  contactType: number
  name: string
  email: string | null
  signatureImage: ImageFileDto
}

export interface CentreTextContentDto {
  id: number
  contentTemplateId: number
  contentTemplateName: string
  audienceId: number | null
  audienceName: string | null
  content: string
  format: ContentFormatDto
}

export interface CentreDetailsDto {
  id: number
  name: string
  code: string
  currencyId: number
  printFormat: number
  isActive: boolean
  isPhysicalCentre: boolean
  contactInfo: CentreContactInfoDto
  legalInfo: CentreLegalInfoDto
  operationalRatios: CentreOperationalRatiosDto
  bankDetails: CentreBankDetailsDto
  contacts: CentreContactDto[]
  texts: CentreTextContentDto[]
  version: string
  createdAt: string
  createdByName: string | null
  updatedAt: string
  updatedByName: string | null
}

export interface CentreListItemDto {
  id: number
  name: string
  code: string
  isActive: boolean
  isPhysicalCentre: boolean
  city: string | null
  countryId: number
  brandColor: string | null
  telephone: string | null
  createdAt: string
  createdByName: string | null
  updatedAt: string
  updatedByName: string | null
}

export interface AddressRequestDto {
  street: string | null
  district: string | null
  city: string | null
  postalCode: string | null
  countryId: number | null
}

export interface ImageFileRequestDto {
  data: string | null
  contentType: string | null
  fileName: string | null
}

export interface CentreContactInfoRequestDto {
  generalEmail: string | null
  accommodationEmail: string | null
  telephone: string | null
  emergencyTelephone: string | null
  transferEmergencyTelephone: string | null
  brandColor: string | null
  contactAddress: AddressRequestDto | null
  logoImage: ImageFileRequestDto | null
}

export interface CentreLegalInfoRequestDto {
  schoolSponsorshipNumber: string | null
  vatNumber: string | null
  registrationNumber: string | null
  vatExemptionNumber: string | null
  chequePayableTo: string | null
}

export interface CentreOperationalRatiosRequestDto {
  guarantees: number | null
  individualsRatio: number | null
  staffingRatio: number | null
  emptyBeds: number | null
}

export interface CentreBankDetailsRequestDto {
  beneficiaryName: string
  accountNumber: string
  bankName: string
  iban: string | null
  swiftCode: string | null
  branchCode: string | null
  abaRoutingNo: string | null
  achAba: string | null
  bankAddress: AddressRequestDto
  beneficiaryBankAddress: AddressRequestDto
  intermediaryBankAddress: AddressRequestDto
  intermediaryBankName: string | null
  intermediarySwiftCode: string | null
}

export interface CentreContactRequestDto {
  contactType: number
  name: string
  email: string | null
  signatureImage: ImageFileRequestDto
}

export interface TextContentRequestDto {
  contentTemplateId: number
  audienceId: number | null
  content: string | null
  format: ContentFormatDto
}

export interface CreateCentreRequestDto {
  name: string
  code: string
  currencyId: number
  printFormat: number
  isActive: boolean
  isPhysicalCentre: boolean
  contactInfo: CentreContactInfoRequestDto
  legalInfo: CentreLegalInfoRequestDto
  operationalRatios: CentreOperationalRatiosRequestDto
  bankDetails: CentreBankDetailsRequestDto
  contacts: CentreContactRequestDto[]
  texts: TextContentRequestDto[]
}

export interface CreateCentreResponseDto {
  id: number
}

export interface UpdateCentreRequestDto extends CreateCentreRequestDto {
  id: number
  version: string
}
