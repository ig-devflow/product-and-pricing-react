export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CourseListItemDto {
  id: number;
  divisionName: string;
  name: string;
  isActive: boolean;
  courseLanguageId: number;
  courseIntensityId: number;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CourseDetailsDto {
  id: number;
  divisionId: number;
  unitTypeId: number;
  courseLanguageId: number;
  courseIntensityId: number;
  name: string;
  isActive: boolean;
  ageFrom: number | null;
  ageTo: number | null;
  minimumWeeks: number | null;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
  version: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CreateCourseRequestDto {
  name: string;
  unitTypeId: number;
  courseLanguageId: number;
  courseIntensityId: number;
  isActive: boolean;
  accountCategoryId: number;
  productCategoryId: number;
  ageFrom: number | null;
  ageTo: number | null;
  minimumWeeks: number | null;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
}

export interface CreateCourseResponseDto {
  id: number;
}

export interface UpdateCourseRequestDto extends CreateCourseRequestDto {
  version: string;
}
