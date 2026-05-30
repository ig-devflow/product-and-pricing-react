export interface CountryReferenceDto {
  id: number;
  code: string;
  name: string;
}

export interface CurrencyReferenceDto {
  id: number;
  isoCode: string;
  name: string;
  symbol: string;
}

export interface AudienceReferenceDto {
  id: number;
  name: string;
}

export const ContentTemplateScopeDto = {
  None: 0,
  Division: 1,
  Centre: 2,
} as const;

export type ContentTemplateScopeDto =
  (typeof ContentTemplateScopeDto)[keyof typeof ContentTemplateScopeDto];

export interface ContentTemplateReferenceDto {
  id: number;
  name: string;
  description: string | null;
  scope: ContentTemplateScopeDto;
}

export interface ReferenceDataNameItem {
  id: number;
  name: string;
}

export interface CourseLanguageReferenceDto {
  id: number;
  name: string;
}

export interface CourseIntensityReferenceDto {
  id: number;
  name: string;
}

export interface UnitTypeReferenceDto {
  id: number;
  name: string;
}

export interface AccountCategoryListItemDto {
  id: number;
  name: string;
}

export interface ProductCategoryListItemDto {
  id: number;
  name: string;
}

export interface AccommodationTypeReferenceDto {
  id: number;
  name: string;
}

export interface AccommodationRoomTypeReferenceDto {
  id: number;
  name: string;
}

export interface AccommodationBathroomTypeReferenceDto {
  id: number;
  name: string;
}

export interface AccommodationBoardTypeReferenceDto {
  id: number;
  name: string;
}

export interface AccommodationRoomGradeReferenceDto {
  id: number;
  name: string;
}

export interface TransferTypeReferenceDto {
  id: number;
  name: string;
}

export interface TransferPortReferenceDto {
  id: number;
  name: string;
}
