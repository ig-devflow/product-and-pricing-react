import type { ReferenceDataNameItem } from '@/shared/api/reference-data/types';

export function findReferenceDataNameById(
  items: ReferenceDataNameItem[],
  id: number | string | null | undefined,
): string {
  if (id === null || id === undefined || id === '') {
    return '';
  }

  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return '';
  }

  return items.find((item) => item.id === numericId)?.name ?? '';
}
