import type {
  CreateAccommodationRequestDto,
  UpdateAccommodationRequestDto,
} from '@/modules/products/accommodations/api/dto';
import type { AccommodationFormValues } from './form.types';

function toOptionalInt(value: number | ''): number | null {
  return typeof value === 'number' ? value : null;
}

export function mapAccommodationFormValuesToCreateDto(
  values: AccommodationFormValues,
): CreateAccommodationRequestDto {
  return {
    name: values.name.trim(),
    accommodationTypeId: values.accommodationTypeId ?? 0,
    isActive: values.isActive,
    minimumStayInWeeks: typeof values.minimumStayInWeeks === 'number' ? values.minimumStayInWeeks : 0,
    ageFrom: toOptionalInt(values.ageFrom),
    ageTo: toOptionalInt(values.ageTo),
    isCommitted: values.isCommitted,
    isNonCommitted: values.isNonCommitted,
  };
}

export function mapAccommodationFormValuesToUpdateDto(
  values: AccommodationFormValues,
  version: string,
): UpdateAccommodationRequestDto {
  return { ...mapAccommodationFormValuesToCreateDto(values), version };
}
