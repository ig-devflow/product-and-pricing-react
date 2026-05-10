import { describe, expect, it } from 'vitest';
import { buildDivisionAddressText } from '../formatters';

describe('division formatters', () => {
  it('builds address text with the resolved country name', () => {
    const addressText = buildDivisionAddressText(
      {
        street: 'Marguerite Mangion Street',
        district: 'St Julians',
        city: '',
        postalCode: '',
        countryId: 2,
      },
      {
        countryName: 'Malta',
      },
    );

    expect(addressText).toBe('Marguerite Mangion Street, St Julians, Malta');
  });

  it('omits country when the country name is not resolved yet', () => {
    const addressText = buildDivisionAddressText({
      street: 'Marguerite Mangion Street',
      district: 'St Julians',
      city: '',
      postalCode: '',
      countryId: 2,
    });

    expect(addressText).toBe('Marguerite Mangion Street, St Julians');
  });
});
