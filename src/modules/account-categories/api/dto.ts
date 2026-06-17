export interface AccountCategoryListItemDto {
  id: number;
  name: string;
}

export interface AccountCategoryDetailsDto {
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

export interface CreateAccountCategoryRequestDto {
  name: string;
  isActive: boolean;
}

export interface CreateAccountCategoryResponseDto {
  id: number;
}

export interface UpdateAccountCategoryRequestDto {
  name: string;
  version: string;
}
