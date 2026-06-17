export interface AccommodationFormValues {
  name: string;
  accommodationTypeId: number | null;
  isActive: boolean;
  minimumStayInWeeks: number | '';
  ageFrom: number | '';
  ageTo: number | '';
  isCommitted: boolean;
  isNonCommitted: boolean;
}
