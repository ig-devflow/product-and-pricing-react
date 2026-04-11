import { useMemo } from 'react';

export type EntityPageMode = 'create' | 'edit' | 'details';

interface UseEntityPageHeaderOptions {
  eyebrow?: string;
  entityLabel: string;
  subtitles: Record<EntityPageMode, string>;
  titles?: Partial<Record<EntityPageMode, string>>;
}

function capitalize(value: string): string {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

export function useEntityPageHeader(
  mode: EntityPageMode,
  options: UseEntityPageHeaderOptions,
) {
  return useMemo(() => {
    const defaultTitles: Record<EntityPageMode, string> = {
      create: `Create ${options.entityLabel}`,
      edit: `Edit ${options.entityLabel}`,
      details: `${capitalize(options.entityLabel)} details`,
    };

    return {
      eyebrow: options.eyebrow ?? '',
      title: options.titles?.[mode] ?? defaultTitles[mode],
      subtitle: options.subtitles[mode],
    };
  }, [mode, options.eyebrow, options.entityLabel, options.subtitles, options.titles]);
}
