export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Matches ProductKind enum: Course=1, AccommodationRoom=2, AddOn=3, Transfer=4, Package=5
export enum ProductKind {
  Course = 1,
  AccommodationRoom = 2,
  AddOn = 3,
  Transfer = 4,
  Package = 5,
}

export interface PackageItemDto {
  productKind: ProductKind;
  productId: number;
  priceBreakdown: number;
}

export interface PackageListItemDto {
  id: number;
  divisionName: string;
  name: string;
  isActive: boolean;
  description: string | null;
  commission: number;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface PackageDetailsDto {
  id: number;
  divisionId: number;
  unitTypeId: number;
  name: string;
  isActive: boolean;
  description: string | null;
  commission: number;
  ageFrom: number | null;
  ageTo: number | null;
  minimumWeeks: number | null;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
  items: PackageItemDto[];
  version: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CreatePackageRequestDto {
  name: string;
  unitTypeId: number;
  isActive: boolean;
  description: string | null;
  commission: number;
  ageFrom: number | null;
  ageTo: number | null;
  minimumWeeks: number | null;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
  items: PackageItemDto[];
}

export interface CreatePackageResponseDto {
  id: number;
}

export interface UpdatePackageRequestDto extends CreatePackageRequestDto {
  version: string;
}
