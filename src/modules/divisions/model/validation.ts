import type { DivisionAddress, DivisionFormValues } from './types';

export interface DivisionAddressErrors {
  countryIsoCode?: string;
}

export interface DivisionFormErrors {
  name?: string;
  websiteUrl?: string;
  headOfficeEmailAddress?: string;
  headOfficeTelephoneNo?: string;
  address: DivisionAddressErrors;
}

export function createEmptyDivisionFormErrors(): DivisionFormErrors {
  return {
    name: undefined,
    websiteUrl: undefined,
    headOfficeEmailAddress: undefined,
    headOfficeTelephoneNo: undefined,
    address: {
      countryIsoCode: undefined,
    },
  };
}

export function validateDivisionForm(
  values: DivisionFormValues,
): DivisionFormErrors {
  const errors = createEmptyDivisionFormErrors();

  if (!values.name.trim()) {
    errors.name = 'Division name is required.';
  }

  if (!values.websiteUrl.trim()) {
    errors.websiteUrl = 'Website URL is required.';
  } else if (!isValidUrl(values.websiteUrl)) {
    errors.websiteUrl = 'Enter a valid URL, for example https://example.com.';
  }

  if (!values.headOfficeEmailAddress.trim()) {
    errors.headOfficeEmailAddress = 'Head office email is required.';
  } else if (!isValidEmail(values.headOfficeEmailAddress)) {
    errors.headOfficeEmailAddress = 'Enter a valid email address.';
  }

  if (!values.headOfficeTelephoneNo.trim()) {
    errors.headOfficeTelephoneNo = 'Head office phone is required.';
  }

  if (
    values.address.countryIsoCode.trim() &&
    values.address.countryIsoCode.trim().length !== 2
  ) {
    errors.address.countryIsoCode = 'Use a 2-letter ISO code, for example GB.';
  }

  return errors;
}

export function hasDivisionFormErrors(errors: DivisionFormErrors): boolean {
  return Boolean(
    errors.name ||
      errors.websiteUrl ||
      errors.headOfficeEmailAddress ||
      errors.headOfficeTelephoneNo ||
      errors.address.countryIsoCode,
  );
}

export function formatDivisionAddressPreview(address: DivisionAddress): string {
  return [
    address.line1,
    address.line2,
    address.line3,
    address.line4,
    address.countryIsoCode,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
