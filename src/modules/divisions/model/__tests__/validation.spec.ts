import { describe, expect, it } from 'vitest';
import { createEmptyDivisionFormValues } from '../mappers';
import { hasDivisionFormErrors, validateDivisionForm } from '../validation';

describe('validateDivisionForm', () => {
  it('returns required field errors for an empty form', () => {
    const errors = validateDivisionForm(createEmptyDivisionFormValues());

    expect(errors.name).toBe('Division name is required.');
    expect(errors.websiteUrl).toBe('Website URL is required.');
    expect(errors.headOfficeEmailAddress).toBe('Head office email is required.');
    expect(errors.headOfficeTelephoneNo).toBe('Head office phone is required.');
    expect(hasDivisionFormErrors(errors)).toBe(true);
  });

  it('accepts a valid minimal form', () => {
    const defaults = createEmptyDivisionFormValues();
    const values = {
      ...defaults,
      name: 'EC Malta',
      websiteUrl: 'https://ecenglish.com/en/malta/',
      headOfficeEmailAddress: 'hello@ecenglish.com',
      headOfficeTelephoneNo: '+44 20 0000 0000',
      address: {
        ...defaults.address,
        countryIsoCode: 'MT',
      },
    };

    const errors = validateDivisionForm(values);

    expect(hasDivisionFormErrors(errors)).toBe(false);
  });
});
