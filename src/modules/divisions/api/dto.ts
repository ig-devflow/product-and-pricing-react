export interface DivisionAddressDto {
  id?: number;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  countryISOCode: string;
}

export interface DivisionBannerDto {
  image: string;
  contentType: string;
  fileName: string;
}

export interface DivisionReportTextDto {
  id: number;
  reportTextId: number;
  divisionId: number;
  centreId: number | null;
  content: string;
  format: number;
  createdOn: string;
  createdBy: string;
  lastModifiedOn: string;
  lastModifiedBy: string;
  isDeleted: boolean;
}

export interface DivisionSummaryDto {
  id: number;
  name: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
  isActive: boolean;
  websiteUrl: string;
  address: DivisionAddressDto;
  accreditationBanner: DivisionBannerDto | null;
  visaLetterNote: string;
  visaLetterNoteFormat: number;
  createdBy: string;
  lastModifiedBy: string;
}

export interface DivisionDetailsDto extends DivisionSummaryDto {
  createdOn: string;
  lastModifiedOn: string;
  years: number[];
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  divisionReportTexts: DivisionReportTextDto[];
}

export interface DivisionUpsertDto {
  name: string;
  websiteUrl: string;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  address: DivisionAddressDto;
  visaLetterNoteFormat: number;
  visaLetterNote: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
}
