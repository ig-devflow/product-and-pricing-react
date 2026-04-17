import type { ReferenceDataItem } from '@/shared/api/reference-data/types'

export function findReferenceDataNameById(items: ReferenceDataItem[], id: string): string {
  const normalizedId = id.trim().toLowerCase()

  if (!normalizedId) {
    return ''
  }

  return items.find((item) => item.id.trim().toLowerCase() === normalizedId)?.name ?? ''
}
