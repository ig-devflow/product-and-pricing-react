import {
  ContentTemplateScopeDto,
  type AudienceReferenceDto,
  type ContentTemplateReferenceDto,
  type CountryReferenceDto,
  type CurrencyReferenceDto,
} from '@/shared/api/reference-data/types';

const countries = [
  {
    id: 1,
    code: 'IE',
    name: 'Ireland',
  },
  {
    id: 2,
    code: 'MT',
    name: 'Malta',
  },
  {
    id: 3,
    code: 'GB',
    name: 'United Kingdom',
  },
] satisfies CountryReferenceDto[];

const currencies = [
  {
    id: 1,
    isoCode: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  {
    id: 2,
    isoCode: 'GBP',
    name: 'Pound sterling',
    symbol: '£',
  },
] satisfies CurrencyReferenceDto[];

const audiences = [
  {
    id: 1,
    name: 'Student',
  },
  {
    id: 2,
    name: 'Agent',
  },
] satisfies AudienceReferenceDto[];

const contentTemplates = [
  {
    id: 10,
    name: 'Visa letter note',
    description: 'Text shown around visa letter workflows.',
    scope: ContentTemplateScopeDto.Division,
  },
  {
    id: 11,
    name: 'Arrival instructions',
    description: null,
    scope: ContentTemplateScopeDto.Division,
  },
] satisfies ContentTemplateReferenceDto[];

export const referenceDataFixtures = {
  getCountries: () => countries,
  getCurrencies: () => currencies,
  getAudiences: () => audiences,
  getContentTemplates: (scope?: number) =>
    scope ? contentTemplates.filter((template) => template.scope === scope) : contentTemplates,
};
