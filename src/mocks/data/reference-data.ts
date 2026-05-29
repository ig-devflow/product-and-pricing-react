import {
  ContentTemplateScopeDto,
  type AccountCategoryListItemDto,
  type AudienceReferenceDto,
  type ContentTemplateReferenceDto,
  type CountryReferenceDto,
  type CourseIntensityReferenceDto,
  type CourseLanguageReferenceDto,
  type CurrencyReferenceDto,
  type ProductCategoryListItemDto,
  type UnitTypeReferenceDto,
} from '@/shared/api/reference-data/types';

const countries = [
  { id: 1, code: 'IE', name: 'Ireland' },
  { id: 2, code: 'MT', name: 'Malta' },
  { id: 3, code: 'GB', name: 'United Kingdom' },
] satisfies CountryReferenceDto[];

const currencies = [
  { id: 1, isoCode: 'EUR', name: 'Euro', symbol: '€' },
  { id: 2, isoCode: 'GBP', name: 'Pound sterling', symbol: '£' },
] satisfies CurrencyReferenceDto[];

const audiences = [
  { id: 1, name: 'Student' },
  { id: 2, name: 'Agent' },
] satisfies AudienceReferenceDto[];

const contentTemplates = [
  { id: 10, name: 'Visa letter note', description: 'Text shown around visa letter workflows.', scope: ContentTemplateScopeDto.Division },
  { id: 11, name: 'Arrival instructions', description: null, scope: ContentTemplateScopeDto.Division },
] satisfies ContentTemplateReferenceDto[];

const courseLanguages = [
  { id: 1, name: 'English' },
  { id: 2, name: 'French' },
  { id: 3, name: 'Spanish' },
  { id: 4, name: 'German' },
] satisfies CourseLanguageReferenceDto[];

const courseIntensities = [
  { id: 1, name: 'Standard' },
  { id: 2, name: 'Intensive' },
  { id: 3, name: 'Super Intensive' },
  { id: 4, name: 'Part-time' },
] satisfies CourseIntensityReferenceDto[];

const unitTypes = [
  { id: 1, name: 'Per week' },
  { id: 2, name: 'Per lesson' },
  { id: 3, name: 'Per day' },
  { id: 4, name: 'Per semester' },
] satisfies UnitTypeReferenceDto[];

const accountCategories = [
  { id: 1, name: 'Tuition' },
  { id: 2, name: 'Accommodation' },
  { id: 3, name: 'Extras' },
] satisfies AccountCategoryListItemDto[];

const productCategories = [
  { id: 1, name: 'Language Course' },
  { id: 2, name: 'Specialist Course' },
  { id: 3, name: 'Junior Programme' },
] satisfies ProductCategoryListItemDto[];

export const referenceDataFixtures = {
  getCountries: () => countries,
  getCurrencies: () => currencies,
  getAudiences: () => audiences,
  getContentTemplates: (scope?: number) =>
    scope ? contentTemplates.filter((t) => t.scope === scope) : contentTemplates,
  getCourseLanguages: () => courseLanguages,
  getCourseIntensities: () => courseIntensities,
  getUnitTypes: () => unitTypes,
  getAccountCategories: () => accountCategories,
  getProductCategories: () => productCategories,
};
