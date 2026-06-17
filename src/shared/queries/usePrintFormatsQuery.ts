import { useQuery } from '@tanstack/react-query'
import { getPrintFormats } from '@/shared/api/reference-data/reference-data.api'
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys'

export const usePrintFormatsQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.printFormats(),
    queryFn: getPrintFormats,
    staleTime: referenceDataStaleTime,
  })
