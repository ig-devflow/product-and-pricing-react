import type {
  DivisionAddress,
  DivisionDetails,
  DivisionSummary,
  DivisionUpsertPayload,
  DivisionVisaLetterNoteFormat,
} from './division';
import type { DivisionDetailsDto, DivisionSummaryDto } from '../api/dto';
import type { DivisionFormValues } from './division-form';

const normalizeCountryIsoCode = (value: string): string => value.trim().toUpperCase();

const toAddress = (address: DivisionAddress): DivisionAddress => ({
  id: address.id,
  line1: address.line1,
  line2: address.line2,
  line3: address.line3,
  line4: address.line4,
  countryISOCode: normalizeCountryIsoCode(address.countryISOCode),
});

export const mapDivisionSummaryDto = (dto: DivisionSummaryDto): DivisionSummary => ({
  ...dto,
  address: toAddress(dto.address),
  visaLetterNoteFormat: dto.visaLetterNoteFormat as DivisionVisaLetterNoteFormat,
});

export const mapDivisionDetailsDto = (dto: DivisionDetailsDto): DivisionDetails => ({
  ...mapDivisionSummaryDto(dto),
  createdOn: dto.createdOn,
  lastModifiedOn: dto.lastModifiedOn,
  years: dto.years,
  headOfficeEmailAddress: dto.headOfficeEmailAddress,
  headOfficeTelephoneNo: dto.headOfficeTelephoneNo,
});

export const mapDivisionDetailsToFormValues = (
  division: DivisionDetails,
): DivisionFormValues => ({
  name: division.name,
  websiteUrl: division.websiteUrl,
  headOfficeEmailAddress: division.headOfficeEmailAddress,
  headOfficeTelephoneNo: division.headOfficeTelephoneNo,
  addressLine1: division.address.line1,
  addressLine2: division.address.line2,
  addressLine3: division.address.line3,
  addressLine4: division.address.line4,
  countryISOCode: division.address.countryISOCode,
  visaLetterNoteFormat: division.visaLetterNoteFormat,
  visaLetterNote: division.visaLetterNote,
  termsAndConditions: division.termsAndConditions,
  groupsPaymentTerms: division.groupsPaymentTerms,
});

export const mapDivisionFormValuesToPayload = (
  values: DivisionFormValues,
): DivisionUpsertPayload => ({
  name: values.name.trim(),
  websiteUrl: values.websiteUrl.trim(),
  headOfficeEmailAddress: values.headOfficeEmailAddress.trim(),
  headOfficeTelephoneNo: values.headOfficeTelephoneNo.trim(),
  address: {
    line1: values.addressLine1.trim(),
    line2: values.addressLine2.trim(),
    line3: values.addressLine3.trim(),
    line4: values.addressLine4.trim(),
    countryISOCode: normalizeCountryIsoCode(values.countryISOCode),
  },
  visaLetterNoteFormat: values.visaLetterNoteFormat,
  visaLetterNote: values.visaLetterNote.trim(),
  termsAndConditions: values.termsAndConditions.trim(),
  groupsPaymentTerms: values.groupsPaymentTerms.trim(),
});
