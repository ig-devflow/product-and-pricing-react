import type { CentreAddress } from './types';
import { CentreContactTypeLabel, type CentreContactType } from './types';

export function getCentreInitials(name: string): string {
  if (!name) return '?';
  const words = name.replace(/^EC\s+/i, '').trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return (words[0]?.slice(0, 2) ?? '').toUpperCase();
  return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')).toUpperCase();
}

export function isAddressEmpty(addr: CentreAddress | null | undefined): boolean {
  if (!addr) return true;
  return ![addr.street, addr.district, addr.city, addr.postalCode, addr.countryId].some(Boolean);
}

export function fmtRatio(v: number | null | undefined): number | string | null {
  if (v == null) return null;
  if (v >= 0 && v <= 1) return Math.round(v * 100);
  return Number(v).toFixed(2);
}

export function fmtRatioSuffix(v: number | null | undefined): string | null {
  if (v == null) return null;
  return '%';
}

export function getCentreContactTypeName(contactType: CentreContactType): string {
  return CentreContactTypeLabel[contactType] ?? 'Unknown';
}

export function formatCentreDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso.includes('T') ? iso : `${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
