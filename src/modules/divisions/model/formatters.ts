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

export function removeProtocol(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
}
