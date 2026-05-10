import type { ContentFormat } from './content-format';

export interface DivisionAddress {
  street: string;
  district: string;
  city: string;
  postalCode: string;
  countryId: number | null;
}

export interface DivisionBanner {
  imageBase64: string;
  contentType: string;
  fileName: string;
}

export interface DivisionTextContent {
  id: number | null;
  contentTemplateId: number;
  contentTemplateName: string;
  audienceId: number | null;
  audienceName: string;
  content: string;
  format: ContentFormat;
}

export interface DivisionListItem {
  id: number;
  name: string;
  isActive: boolean;
}

export interface DivisionListPage {
  items: DivisionListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface DivisionDetails {
  id: number;
  name: string;
  isActive: boolean;
  websiteUrl: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
  contactAddress: DivisionAddress;
  accreditationBanner: DivisionBanner | null;
  headOfficeEmail: string;
  headOfficeTelephoneNo: string;
  texts: DivisionTextContent[];
  version: string;
}
