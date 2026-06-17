import { useQuery } from '@tanstack/react-query';
import { getDivisionOptions } from '@/modules/divisions/api/divisions.api';
import { divisionQueryKeys } from '@/modules/divisions/model/query-keys';

export const useDivisionOptionsQuery = () =>
  useQuery({
    queryKey: divisionQueryKeys.options(),
    queryFn: getDivisionOptions,
    staleTime: 5 * 60 * 1000,
  });
