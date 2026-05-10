import { httpClient } from '@/shared/api/http/http-client';
import type {
  AudienceReferenceDto,
  ContentTemplateReferenceDto,
  ContentTemplateScopeDto,
  CountryReferenceDto,
  CurrencyReferenceDto,
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
