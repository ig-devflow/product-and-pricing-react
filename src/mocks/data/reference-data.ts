import type { ReferenceDataItem } from '@/shared/api/reference-data/types'

const countries = [
  {
    id: 'IE',
    name: 'Ireland',
  },
  {
    id: 'MT',
    name: 'Malta',
  },
  {
    id: 'GB',
    name: 'United Kingdom',
  },
] satisfies ReferenceDataItem[]

export const referenceDataFixtures = {
  getCountries: () => countries,
}
