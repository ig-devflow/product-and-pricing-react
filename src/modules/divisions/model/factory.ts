import type { DivisionDetails } from './types';
import { createEmptyDivisionFormValues } from './factories';

export * from './factories';

export const createDivisionFormDefaults = createEmptyDivisionFormValues;

export const createDivisionSummaryItems = (
  division: Pick<
    DivisionDetails,
    'id' | 'createdOn' | 'lastModifiedOn' | 'createdBy' | 'lastModifiedBy'
  >,
): Array<{ label: string; value: string }> => [
  { label: 'Division ID', value: String(division.id) },
  { label: 'Created by', value: division.createdBy },
  { label: 'Last modified by', value: division.lastModifiedBy },
  { label: 'Created on', value: division.createdOn },
  { label: 'Last modified on', value: division.lastModifiedOn },
];
