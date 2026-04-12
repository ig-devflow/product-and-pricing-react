import { useEntityPageHeader, type EntityPageMode } from '@/shared/hooks/useEntityPageHeader';

export type DivisionPageMode = EntityPageMode;

export function useDivisionPageHeader(mode: DivisionPageMode) {
  return useEntityPageHeader(mode, {
    eyebrow: 'Division Manager',
    entityLabel: 'division',
    subtitles: {
      create:
        'Create a division record with contact details, content blocks, and banner settings.',
      edit: 'Update division details, content, and banner settings.',
      details:
        'Review division details, contact information, and content before making changes.',
    },
  });
}
