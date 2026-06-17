export interface ProductCategoryListItemDto {
  id: number;
  name: string;
}

export interface ProductCategoryDetailsDto {
  id: number;
  divisionId: number;
  name: string;
  isActive: boolean;
  version: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CreateProductCategoryRequestDto {
  name: string;
  isActive: boolean;
}

export interface CreateProductCategoryResponseDto {
  id: number;
}

export interface UpdateProductCategoryRequestDto {
  name: string;
  version: string;
}
