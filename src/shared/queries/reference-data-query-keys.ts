import type { ContentTemplateScopeDto } from '@/shared/api/reference-data/types';

export const referenceDataQueryKeys = {
  all: ['reference-data'] as const,
  countries: () => [...referenceDataQueryKeys.all, 'countries'] as const,
  currencies: () => [...referenceDataQueryKeys.all, 'currencies'] as const,
  audiences: () => [...referenceDataQueryKeys.all, 'audiences'] as const,
  contentTemplates: (scope?: ContentTemplateScopeDto) =>
    [...referenceDataQueryKeys.all, 'content-templates', scope ?? null] as const,
};

export const referenceDataStaleTime = 5 * 60 * 1000;
