import { httpClient } from '@/shared/api/http/http-client';
import type {
  PackageDetailsDto,
  PackageListItemDto,
  CreatePackageRequestDto,
  CreatePackageResponseDto,
  PagedResultDto,
  UpdatePackageRequestDto,
} from './dto';
import type { GetPackagesParams } from '../model/query-keys';

export async function getPackages(
  divisionId: number,
  params: GetPackagesParams = {},
): Promise<PagedResultDto<PackageListItemDto>> {
  return httpClient.get<PagedResultDto<PackageListItemDto>>(
    `/api/v1/divisions/${divisionId}/packages`,
    { ...params },
  );
}

export async function getPackageById(id: number): Promise<PackageDetailsDto> {
  return httpClient.get<PackageDetailsDto>(`/api/v1/packages/${id}`);
}

export async function createPackage(
  divisionId: number,
  payload: CreatePackageRequestDto,
): Promise<CreatePackageResponseDto> {
  return httpClient.post<CreatePackageResponseDto, CreatePackageRequestDto>(
    `/api/v1/divisions/${divisionId}/packages`,
    payload,
  );
}

export async function updatePackage(id: number, payload: UpdatePackageRequestDto): Promise<void> {
  await httpClient.put<null, UpdatePackageRequestDto>(`/api/v1/packages/${id}`, payload);
}
