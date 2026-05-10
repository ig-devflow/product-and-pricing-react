import { useQuery } from '@tanstack/react-query';
import { getContentTemplates } from '@/shared/api/reference-data/reference-data.api';
import type { ContentTemplateScopeDto } from '@/shared/api/reference-data/types';
import {
  referenceDataQueryKeys,
  referenceDataStaleTime,
} from './reference-data-query-keys';

export const useContentTemplatesQuery = (scope?: ContentTemplateScopeDto) =>
  useQuery({
    queryKey: referenceDataQueryKeys.contentTemplates(scope),
    queryFn: () => getContentTemplates(scope),
    staleTime: referenceDataStaleTime,
  });
