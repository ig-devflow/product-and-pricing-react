export const ContentFormatDto = {
  PlainText: 0,
  Html: 1,
} as const;

export type ContentFormatDto =
  (typeof ContentFormatDto)[keyof typeof ContentFormatDto];

export interface ContactAddressDto {
  id?: number | null;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  countryISOCode: string;
}

export interface ImageFileDto {
  image?: string | null;
  contentType: string;
  fileName?: string | null;
}

export interface DivisionReportTextDto {
  id: number;
  reportTextId: number;
  divisionId?: number | null;
  centreId?: number | null;
  content: string;
  format: ContentFormatDto;
  createdOn: string;
  createdBy: string;
  lastModifiedOn: string;
  lastModifiedBy: string;
  isDeleted: boolean;
}

export interface DivisionSummaryDto {
  id: number;
  name: string;
  termsAndConditions?: string | null;
  groupsPaymentTerms?: string | null;
  isActive: boolean;
  websiteUrl: string;
  address?: ContactAddressDto | null;
  accreditationBanner?: ImageFileDto | null;
  visaLetterNote?: string | null;
  visaLetterNoteFormat: ContentFormatDto;
  createdBy: string;
  lastModifiedBy: string;
}

export interface DivisionDetailsDto {
  id: number;
  name: string;
  termsAndConditions?: string | null;
  groupsPaymentTerms?: string | null;
  isActive: boolean;
  websiteUrl: string;
  address: ContactAddressDto;
  accreditationBanner: ImageFileDto;
  visaLetterNote?: string | null;
  visaLetterNoteFormat: ContentFormatDto;
  createdOn: string;
  createdBy: string;
  lastModifiedOn: string;
  lastModifiedBy: string;
  years: number[];
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  divisionReportTexts: DivisionReportTextDto[];
}

export interface CreateDivisionRequestDto {
  id?: number;
  name: string;
  termsAndConditions?: string | null;
  groupsPaymentTerms?: string | null;
  isActive: boolean;
  websiteUrl: string;
  visaLetterNote?: string | null;
  visaLetterNoteFormat: ContentFormatDto;
  address?: ContactAddressDto | null;
  accreditationBanner?: ImageFileDto | null;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  divisionReportTexts: DivisionReportTextDto[];
}

export interface UpdateDivisionRequestDto {
  name: string;
  termsAndConditions?: string | null;
  groupsPaymentTerms?: string | null;
  isActive?: boolean | null;
  websiteUrl: string;
  visaLetterNote?: string | null;
  visaLetterNoteFormat?: ContentFormatDto | null;
  address?: ContactAddressDto | null;
  accreditationBanner?: ImageFileDto | null;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  divisionReportTexts: DivisionReportTextDto[];
}
