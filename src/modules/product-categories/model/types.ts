export interface ProductCategoryListItem {
  id: number;
  name: string;
}

export interface ProductCategoryDetails {
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

export interface ProductCategoryFormValues {
  name: string;
  isActive: boolean;
}
