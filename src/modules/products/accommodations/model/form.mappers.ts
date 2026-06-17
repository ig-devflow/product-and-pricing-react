import type { AccommodationDetails } from './types';
import type { AccommodationFormValues } from './form.types';

export function createEmptyAccommodationFormValues(): AccommodationFormValues {
  return {
    name: '',
    accommodationTypeId: null,
    isActive: true,
    minimumStayInWeeks: '',
    ageFrom: '',
    ageTo: '',
    isCommitted: false,
    isNonCommitted: false,
  };
}

export function mapAccommodationDetailsToFormValues(
  details: AccommodationDetails,
): AccommodationFormValues {
  return {
    name: details.name,
    accommodationTypeId: details.accommodationTypeId,
    isActive: details.isActive,
    minimumStayInWeeks: details.minimumStayInWeeks,
    ageFrom: details.minimumAge ?? '',
    ageTo: details.maximumAge ?? '',
    isCommitted: details.isCommitted,
    isNonCommitted: details.isNonCommitted,
  };
}
