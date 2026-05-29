import { httpClient } from '@/shared/api/http/http-client';
import type {
  AccountCategoryListItemDto,
  AudienceReferenceDto,
  ContentTemplateReferenceDto,
  ContentTemplateScopeDto,
  CountryReferenceDto,
  CourseIntensityReferenceDto,
  CourseLanguageReferenceDto,
  CurrencyReferenceDto,
  ProductCategoryListItemDto,
  UnitTypeReferenceDto,
} from './types';

const REFERENCE_DATA_BASE_PATH = '/api/v1/reference-data';

export async function getCountries(): Promise<CountryReferenceDto[]> {
  return httpClient.get<CountryReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/countries`,
  );
}

export async function getCurrencies(): Promise<CurrencyReferenceDto[]> {
  return httpClient.get<CurrencyReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/currencies`,
  );
}

export async function getAudiences(): Promise<AudienceReferenceDto[]> {
  return httpClient.get<AudienceReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/audiences`,
  );
}

export async function getContentTemplates(
  scope?: ContentTemplateScopeDto,
): Promise<ContentTemplateReferenceDto[]> {
  return httpClient.get<ContentTemplateReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/content-templates`,
    { scope },
  );
}

export async function getCourseLanguages(): Promise<CourseLanguageReferenceDto[]> {
  return httpClient.get<CourseLanguageReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/course-languages`,
  );
}

export async function getCourseIntensities(): Promise<CourseIntensityReferenceDto[]> {
  return httpClient.get<CourseIntensityReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/course-intensities`,
  );
}

export async function getUnitTypes(): Promise<UnitTypeReferenceDto[]> {
  return httpClient.get<UnitTypeReferenceDto[]>(
    `${REFERENCE_DATA_BASE_PATH}/unit-types`,
  );
}

export async function getAccountCategories(divisionId: number): Promise<AccountCategoryListItemDto[]> {
  return httpClient.get<AccountCategoryListItemDto[]>(
    `/api/v1/divisions/${divisionId}/account-categories`,
  );
}

export async function getProductCategories(divisionId: number): Promise<ProductCategoryListItemDto[]> {
  return httpClient.get<ProductCategoryListItemDto[]>(
    `/api/v1/divisions/${divisionId}/product-categories`,
  );
}
