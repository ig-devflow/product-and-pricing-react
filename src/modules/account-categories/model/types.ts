export interface AccountCategoryListItem {
  id: number;
  name: string;
}

export interface AccountCategoryDetails {
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

export interface AccountCategoryFormValues {
  name: string;
  isActive: boolean;
}
