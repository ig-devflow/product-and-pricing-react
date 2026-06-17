import { httpClient } from '@/shared/api/http/http-client';
import type {
  ProductCategoryDetailsDto,
  ProductCategoryListItemDto,
  CreateProductCategoryRequestDto,
  CreateProductCategoryResponseDto,
  UpdateProductCategoryRequestDto,
} from './dto';

export async function getProductCategoriesByDivision(
  divisionId: number,
): Promise<ProductCategoryListItemDto[]> {
  return httpClient.get<ProductCategoryListItemDto[]>(
    `/api/v1/divisions/${divisionId}/product-categories`,
  );
}

export async function getProductCategoryById(
  id: number,
): Promise<ProductCategoryDetailsDto> {
  return httpClient.get<ProductCategoryDetailsDto>(
    `/api/v1/product-categories/${id}`,
  );
}

export async function createProductCategory(
  divisionId: number,
  payload: CreateProductCategoryRequestDto,
): Promise<CreateProductCategoryResponseDto> {
  return httpClient.post<CreateProductCategoryResponseDto, CreateProductCategoryRequestDto>(
    `/api/v1/divisions/${divisionId}/product-categories`,
    payload,
  );
}

export async function updateProductCategory(
  id: number,
  payload: UpdateProductCategoryRequestDto,
): Promise<void> {
  await httpClient.put<null, UpdateProductCategoryRequestDto>(
    `/api/v1/product-categories/${id}`,
    payload,
  );
}
