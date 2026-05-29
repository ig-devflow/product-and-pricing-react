import type { AuditFields } from '@/modules/products/shared/model/audit';

export interface AccommodationListItem extends AuditFields {
  id: number;
  name: string;
  accommodationTypeName: string;
  isActive: boolean;
}

export interface AccommodationListPage {
  items: AccommodationListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AccommodationDetails extends AuditFields {
  id: number;
  name: string;
  accommodationTypeId: number;
  isActive: boolean;
  minimumStayInWeeks: number;
  minimumAge: number | null;
  maximumAge: number | null;
  isCommitted: boolean;
  isNonCommitted: boolean;
}
