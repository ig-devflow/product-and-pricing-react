import { httpClient } from '@/shared/api/http/http-client'
import type { ReferenceDataItem } from './types'

const REFERENCE_DATA_BASE_PATH = '/api/ReferenceData'

export async function getCountries(): Promise<ReferenceDataItem[]> {
  return httpClient.get<ReferenceDataItem[]>(`${REFERENCE_DATA_BASE_PATH}/countries`)
}
