import type { DivisionAddress } from './types';

export function buildDivisionAddressText(address: DivisionAddress): string {
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

export function removeProtocol(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
}
