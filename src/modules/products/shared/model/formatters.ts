import { formatDateTime, buildEditorDisplayText } from '@/modules/divisions/model/formatters';
import type { AuditFields } from './audit';

export { formatDateTime, buildEditorDisplayText };

export function buildProductAuditFields(dto: {
  createdAt: string;
  createdByName: string | null;
  updatedAt: string | null;
  updatedByName: string | null;
  version: string;
}): AuditFields {
  const createdAt = dto.createdAt ?? '';
  const updatedAt = dto.updatedAt ?? '';

  return {
    version: dto.version,
    createdAt,
    createdByName: dto.createdByName?.trim() ?? '',
    updatedAt,
    updatedByName: dto.updatedByName?.trim() ?? '',
    createdAtText: formatDateTime(createdAt),
    createdByText: buildEditorDisplayText(dto.createdByName),
    updatedAtText: formatDateTime(updatedAt),
    updatedByText: buildEditorDisplayText(dto.updatedByName),
  };
}

export function toTrimmedString(value: string | null | undefined): string {
  return value?.trim() ?? '';
}
