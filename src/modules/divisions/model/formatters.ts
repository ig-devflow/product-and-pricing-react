import type { DivisionAddress } from './types';

interface BuildDivisionAddressTextOptions {
  countryName?: string;
}

export function buildDivisionAddressText(
  address: DivisionAddress,
  options: BuildDivisionAddressTextOptions = {},
): string {
  return [
    address.street,
    address.district,
    address.city,
    address.postalCode,
    options.countryName,
  ]
    .map((part) => part?.trim() ?? '')
    .filter(Boolean)
    .join(', ');
}

export function buildDivisionLocationText(
  city: string | null | undefined,
  countryName: string | null | undefined,
): string {
  return [city, countryName]
    .map((part) => part?.trim() ?? '')
    .filter(Boolean)
    .join(', ');
}

export function removeProtocol(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
}

const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
});

export function formatDateTime(value: string | null | undefined): string {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return '';
  }

  const isDateOnly = dateOnlyPattern.test(normalizedValue);
  const date = new Date(isDateOnly ? `${normalizedValue}T00:00:00Z` : normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return isDateOnly ? dateFormatter.format(date) : dateTimeFormatter.format(date);
}

export function buildEditorDisplayText(name: string | null | undefined): string {
  return name?.trim() || 'Unknown editor';
}

export function buildAuditDisplayText(
  dateText: string,
  editorText: string,
  missingDateText: string,
): string {
  return dateText ? `${dateText} by ${editorText}` : missingDateText;
}

export function getDivisionInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return '--';
  }

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}
