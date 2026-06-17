import type { ContentTemplateScopeDto } from '@/shared/api/reference-data/types';

export const referenceDataQueryKeys = {
  all: ['reference-data'] as const,
  countries: () => [...referenceDataQueryKeys.all, 'countries'] as const,
  currencies: () => [...referenceDataQueryKeys.all, 'currencies'] as const,
  audiences: () => [...referenceDataQueryKeys.all, 'audiences'] as const,
  contentTemplates: (scope?: ContentTemplateScopeDto) =>
    [...referenceDataQueryKeys.all, 'content-templates', scope ?? null] as const,
  courseLanguages: () => [...referenceDataQueryKeys.all, 'course-languages'] as const,
  courseIntensities: () => [...referenceDataQueryKeys.all, 'course-intensities'] as const,
  unitTypes: () => [...referenceDataQueryKeys.all, 'unit-types'] as const,
  accountCategories: (divisionId: number) =>
    [...referenceDataQueryKeys.all, 'account-categories', divisionId] as const,
  productCategories: (divisionId: number) =>
    [...referenceDataQueryKeys.all, 'product-categories', divisionId] as const,
  accommodationTypes: () => [...referenceDataQueryKeys.all, 'accommodation-types'] as const,
  accommodationRoomTypes: () => [...referenceDataQueryKeys.all, 'accommodation-room-types'] as const,
  accommodationBathroomTypes: () => [...referenceDataQueryKeys.all, 'accommodation-bathroom-types'] as const,
  accommodationBoardTypes: () => [...referenceDataQueryKeys.all, 'accommodation-board-types'] as const,
  accommodationRoomGrades: () => [...referenceDataQueryKeys.all, 'accommodation-room-grades'] as const,
  transferTypes: () => [...referenceDataQueryKeys.all, 'transfer-types'] as const,
  transferPorts: () => [...referenceDataQueryKeys.all, 'transfer-ports'] as const,
  printFormats: () => [...referenceDataQueryKeys.all, 'print-formats'] as const,
};

export const referenceDataStaleTime = 5 * 60 * 1000;
