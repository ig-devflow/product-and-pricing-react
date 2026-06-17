import { httpClient } from '@/shared/api/http/http-client';
import type {
  AccountCategoryDetailsDto,
  AccountCategoryListItemDto,
  CreateAccountCategoryRequestDto,
  CreateAccountCategoryResponseDto,
  UpdateAccountCategoryRequestDto,
} from './dto';

export async function getAccountCategoriesByDivision(
  divisionId: number,
): Promise<AccountCategoryListItemDto[]> {
  return httpClient.get<AccountCategoryListItemDto[]>(
    `/api/v1/divisions/${divisionId}/account-categories`,
  );
}

export async function getAccountCategoryById(
  id: number,
): Promise<AccountCategoryDetailsDto> {
  return httpClient.get<AccountCategoryDetailsDto>(
    `/api/v1/account-categories/${id}`,
  );
}

export async function createAccountCategory(
  divisionId: number,
  payload: CreateAccountCategoryRequestDto,
): Promise<CreateAccountCategoryResponseDto> {
  return httpClient.post<CreateAccountCategoryResponseDto, CreateAccountCategoryRequestDto>(
    `/api/v1/divisions/${divisionId}/account-categories`,
    payload,
  );
}

export async function updateAccountCategory(
  id: number,
  payload: UpdateAccountCategoryRequestDto,
): Promise<void> {
  await httpClient.put<null, UpdateAccountCategoryRequestDto>(
    `/api/v1/account-categories/${id}`,
    payload,
  );
}
