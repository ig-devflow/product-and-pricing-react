import { useQuery } from '@tanstack/react-query'
import { getCountries } from '@/shared/api/reference-data/reference-data.api'

export const referenceDataQueryKeys = {
  all: ['reference-data'] as const,
  countries: () => [...referenceDataQueryKeys.all, 'countries'] as const,
}

export const useCountriesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.countries(),
    queryFn: getCountries,
    staleTime: 5 * 60 * 1000,
  })
