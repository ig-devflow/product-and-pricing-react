import type { DivisionAddress } from './types'

interface BuildDivisionAddressTextOptions {
  countryName?: string
  fallbackToCountryCode?: boolean
}

export function buildDivisionAddressText(
  address: DivisionAddress,
  options: BuildDivisionAddressTextOptions = {},
): string {
  const countryText =
    options.countryName?.trim() ||
    (options.fallbackToCountryCode === false ? '' : address.countryIsoCode)

  return [address.line1, address.line2, address.line3, address.line4, countryText]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ')
}

export function removeProtocol(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '')
}
