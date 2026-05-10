import type { ContentFormat } from './content-format';
import type { DivisionBanner } from './types';

export interface DivisionAddressFormValue {
  street: string;
  district: string;
  city: string;
  postalCode: string;
  countryId: string;
}

export interface DivisionTextContentFormValue {
  textId: number | null;
  contentTemplateId: string;
  audienceId: string;
  content: string;
  format: ContentFormat;
}

export interface DivisionFormValues {
  name: string;
  isActive: boolean;
  websiteUrl: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
  contactAddress: DivisionAddressFormValue;
  accreditationBanner: DivisionBanner | null;
  headOfficeEmail: string;
  headOfficeTelephoneNo: string;
  texts: DivisionTextContentFormValue[];
}
