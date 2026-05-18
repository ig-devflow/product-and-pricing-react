import type { ContentFormat } from '@/modules/divisions/model/content-format';

export const CentreContactType = {
  None: 0,
  CentreDirector: 1,
  DirectorOfStudies: 2,
} as const;

export type CentreContactType = (typeof CentreContactType)[keyof typeof CentreContactType];

export const CentreContactTypeLabel: Record<CentreContactType, string> = {
  [CentreContactType.None]: 'Unknown',
  [CentreContactType.CentreDirector]: 'Centre director',
  [CentreContactType.DirectorOfStudies]: 'Director of studies',
};

export const CENTRE_CONTACT_TYPE_OPTIONS = [
  { value: CentreContactType.CentreDirector, label: 'Centre director' },
  { value: CentreContactType.DirectorOfStudies, label: 'Director of studies' },
] as const;

export const PrintFormat = {
  None: 0,
  A4: 1,
  Letter: 2,
} as const;

export type PrintFormat = (typeof PrintFormat)[keyof typeof PrintFormat];

export const PrintFormatLabel: Record<PrintFormat, string> = {
  [PrintFormat.None]: 'None',
  [PrintFormat.A4]: 'A4',
  [PrintFormat.Letter]: 'Letter',
};

export const PRINT_FORMAT_OPTIONS = [
  { value: PrintFormat.A4, label: 'A4' },
  { value: PrintFormat.Letter, label: 'Letter' },
] as const;

export interface CentreAddress {
  street: string;
  district: string;
  city: string;
  postalCode: string;
  countryId: number | null;
}

export interface CentreImageFile {
  base64: string;
  contentType: string;
  fileName: string;
}

export interface CentreContactInfo {
  generalEmail: string;
  accommodationEmail: string;
  telephone: string;
  emergencyTelephone: string;
  transferEmergencyTelephone: string;
  brandColor: string;
  contactAddress: CentreAddress;
  logoImage: CentreImageFile | null;
}

export interface CentreLegalInfo {
  schoolSponsorshipNumber: string;
  vatNumber: string;
  registrationNumber: string;
  vatExemptionNumber: string;
  chequePayableTo: string;
}

export interface CentreOperationalRatios {
  guarantees: number | null;
  individualsRatio: number | null;
  staffingRatio: number | null;
  emptyBeds: number | null;
}

export interface CentreBankDetails {
  beneficiaryName: string;
  accountNumber: string;
  bankName: string;
  iban: string;
  swiftCode: string;
  branchCode: string;
  abaRoutingNo: string;
  achAba: string;
  intermediaryBankName: string;
  intermediarySwiftCode: string;
  bankAddress: CentreAddress;
  beneficiaryBankAddress: CentreAddress;
  intermediaryBankAddress: CentreAddress;
}

export interface CentreContact {
  contactType: CentreContactType;
  name: string;
  email: string;
  signatureImage: CentreImageFile | null;
}

export interface CentreTextContent {
  id: number;
  contentTemplateId: number;
  contentTemplateName: string;
  audienceId: number | null;
  audienceName: string | null;
  content: string;
  format: ContentFormat;
}

export interface CentreDetails {
  id: number;
  name: string;
  code: string;
  currencyId: number;
  printFormat: PrintFormat;
  isActive: boolean;
  isPhysicalCentre: boolean;
  contactInfo: CentreContactInfo;
  legalInfo: CentreLegalInfo;
  operationalRatios: CentreOperationalRatios;
  bankDetails: CentreBankDetails;
  contacts: CentreContact[];
  texts: CentreTextContent[];
  version: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CentreListItem {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  isPhysicalCentre: boolean;
  city: string;
  countryId: number;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CentreListPage {
  items: CentreListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}
