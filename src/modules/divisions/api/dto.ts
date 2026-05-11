export const ContentFormatDto = {
  None: 0,
  PlainText: 1,
  Html: 2,
} as const;

export type ContentFormatDto =
  (typeof ContentFormatDto)[keyof typeof ContentFormatDto];

export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ContactAddressDto {
  street: string | null;
  district: string | null;
  city: string | null;
  postalCode: string | null;
  countryId: number | null;
}

export interface ImageBannerDto {
  data: string | null;
  contentType: string | null;
  fileName: string | null;
}

export interface DivisionTextContentDto {
  id: number;
  contentTemplateId: number;
  contentTemplateName: string;
  audienceId: number | null;
  audienceName: string | null;
  content: string;
  format: ContentFormatDto;
}

export interface TextContentRequestDto {
  contentTemplateId: number;
  audienceId: number | null;
  content: string | null;
  format: ContentFormatDto;
}

export interface DivisionListItemDto {
  id: number;
  name: string;
  isActive: boolean;
  websiteUrl: string | null;
  headOfficeEmail: string | null;
  city: string | null;
  countryName: string | null;
  createdAt: string;
  createdByName: string | null;
  updatedAt: string | null;
  updatedByName: string | null;
}

export interface DivisionDetailsDto {
  id: number;
  name: string;
  isActive: boolean;
  termsAndConditions: string | null;
  groupsPaymentTerms: string | null;
  websiteUrl: string | null;
  headOfficeEmail: string | null;
  headOfficeTelephoneNo: string | null;
  accreditationBanner: ImageBannerDto | null;
  contactAddress: ContactAddressDto | null;
  texts: DivisionTextContentDto[];
  version: string;
  createdAt: string;
  createdByName: string | null;
  updatedAt: string | null;
  updatedByName: string | null;
}

export interface CreateDivisionRequestDto {
  name: string;
  websiteUrl: string | null;
  isActive: boolean;
  termsAndConditions: string | null;
  groupsPaymentTerms: string | null;
  headOfficeEmail: string | null;
  headOfficeTelephoneNo: string | null;
  contactAddress: ContactAddressDto | null;
  accreditationBanner: ImageBannerDto | null;
  texts: TextContentRequestDto[];
}

export interface CreateDivisionResponseDto {
  id: number;
}

export interface UpdateDivisionRequestDto extends CreateDivisionRequestDto {
  version: string;
}
