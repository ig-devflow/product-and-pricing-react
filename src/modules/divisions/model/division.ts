export const DivisionVisaLetterNoteFormat = {
  PlainText: 0,
  RichText: 1,
} as const;

export type DivisionVisaLetterNoteFormat =
  (typeof DivisionVisaLetterNoteFormat)[keyof typeof DivisionVisaLetterNoteFormat];

export interface DivisionAddress {
  id?: number;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  countryISOCode: string;
}

export interface DivisionBanner {
  image: string;
  contentType: string;
  fileName: string;
}

export interface DivisionSummary {
  id: number;
  name: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
  isActive: boolean;
  websiteUrl: string;
  address: DivisionAddress;
  accreditationBanner: DivisionBanner | null;
  visaLetterNote: string;
  visaLetterNoteFormat: DivisionVisaLetterNoteFormat;
  createdBy: string;
  lastModifiedBy: string;
}

export interface DivisionDetails extends DivisionSummary {
  createdOn: string;
  lastModifiedOn: string;
  years: number[];
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
}

export interface DivisionUpsertPayload {
  name: string;
  websiteUrl: string;
  headOfficeEmailAddress: string;
  headOfficeTelephoneNo: string;
  address: DivisionAddress;
  visaLetterNoteFormat: DivisionVisaLetterNoteFormat;
  visaLetterNote: string;
  termsAndConditions: string;
  groupsPaymentTerms: string;
}

export const divisionVisaLetterNoteFormatOptions: Array<{
  value: DivisionVisaLetterNoteFormat;
  label: string;
}> = [
  { value: DivisionVisaLetterNoteFormat.RichText, label: 'Rich text' },
  { value: DivisionVisaLetterNoteFormat.PlainText, label: 'Plain text' },
];
