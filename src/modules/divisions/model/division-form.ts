import type { DivisionUpsertPayload, DivisionVisaLetterNoteFormat } from './division';

export interface DivisionFormValues {
  name: string;
  websiteUrl: string;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  countryISOCode: string;
  visaLetterNoteFormat: DivisionVisaLetterNoteFormat;
  visaLetterNote: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
}

export type DivisionFormSubmitPayload = DivisionUpsertPayload;
