import {
  DivisionVisaLetterNoteFormat,
  type DivisionDetails,
} from './division';
import type { DivisionFormValues } from './division-form';

export const createDivisionFormDefaults = (): DivisionFormValues => ({
  name: '',
  websiteUrl: '',
  headOfficeEmailAddress: '',
  headOfficeTelephoneNo: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  addressLine4: '',
  countryISOCode: '',
  visaLetterNoteFormat: DivisionVisaLetterNoteFormat.RichText,
  visaLetterNote: '',
  termsAndConditions: '',
  groupsPaymentTerms: '',
});

export const createDivisionSummaryItems = (
  division: Pick<DivisionDetails, 'id' | 'createdOn' | 'lastModifiedOn' | 'createdBy' | 'lastModifiedBy'>,
): Array<{ label: string; value: string }> => [
  { label: 'Division ID', value: String(division.id) },
  { label: 'Created by', value: division.createdBy },
  { label: 'Last modified by', value: division.lastModifiedBy },
  { label: 'Created on', value: division.createdOn },
  { label: 'Last modified on', value: division.lastModifiedOn },
];
