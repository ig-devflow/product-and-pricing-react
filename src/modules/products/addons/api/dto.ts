export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Matches AddOnType enum: OneToOneCourse=1, Exam=2, Activity=3, Insurance=4, Generic=5
export const AddOnType = {
  OneToOneCourse: 1,
  Exam: 2,
  Activity: 3,
  Insurance: 4,
  Generic: 5,
} as const;
export type AddOnType = (typeof AddOnType)[keyof typeof AddOnType];

export interface AddOnListItemDto {
  id: number;
  divisionName: string;
  name: string;
  isActive: boolean;
  addOnType: AddOnType;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface AddOnDetailsDto {
  id: number;
  divisionId: number;
  unitTypeId: number;
  addOnType: AddOnType;
  name: string;
  isActive: boolean;
  ageFrom: number | null;
  ageTo: number | null;
  oneToOneLessonsPerWeek: number | null;
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

export interface CreateAddOnRequestDto {
  name: string;
  unitTypeId: number;
  addOnType: AddOnType;
  isActive: boolean;
  accountCategoryId: number;
  productCategoryId: number;
  ageFrom: number | null;
  ageTo: number | null;
  oneToOneLessonsPerWeek: number | null;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
}

export interface CreateAddOnResponseDto {
  id: number;
}

export interface UpdateAddOnRequestDto extends CreateAddOnRequestDto {
  version: string;
}
