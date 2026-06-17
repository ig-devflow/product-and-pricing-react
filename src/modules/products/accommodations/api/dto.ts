export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AccommodationListItemDto {
  id: number;
  name: string;
  accommodationTypeName: string;
  isActive: boolean;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface AccommodationDetailsDto {
  id: number;
  name: string;
  accommodationTypeId: number;
  isActive: boolean;
  minimumStayInWeeks: number;
  minimumAge: number | null;
  maximumAge: number | null;
  isCommitted: boolean;
  isNonCommitted: boolean;
  version: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CreateAccommodationRequestDto {
  name: string;
  accommodationTypeId: number;
  isActive: boolean;
  minimumStayInWeeks: number;
  ageFrom: number | null;
  ageTo: number | null;
  isCommitted: boolean;
  isNonCommitted: boolean;
}

export interface CreateAccommodationResponseDto {
  id: number;
}

export interface UpdateAccommodationRequestDto extends CreateAccommodationRequestDto {
  version: string;
}
