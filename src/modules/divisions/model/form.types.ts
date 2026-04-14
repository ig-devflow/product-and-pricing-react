import type { ContentFormat } from './content-format';
import type { DivisionAddress, DivisionBanner } from './types';

export interface DivisionFormValues {
  name: string;
  isActive: boolean;
  websiteUrl: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
  visaLetterNote: string;
  visaLetterNoteFormat: ContentFormat;
  address: DivisionAddress;
  accreditationBanner: DivisionBanner | null;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
}
