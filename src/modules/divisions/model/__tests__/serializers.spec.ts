import { describe, expect, it } from 'vitest';
import { createEmptyDivisionFormValues } from '../factories';
import { ContentFormat } from '../types';
import { mapFormValuesToCreateDto, mapFormValuesToUpdateDto } from '../serializers';

describe('division serializers', () => {
  it('builds create payload with trimmed values and an empty report-text collection', () => {
    const payload = mapFormValuesToCreateDto({
      ...createEmptyDivisionFormValues(),
      name: '  EC Malta  ',
      websiteUrl: '  https://ecenglish.com/en/malta/  ',
      headOfficeEmailAddress: '  hello@ecenglish.com  ',
      headOfficeTelephoneNo: '  +356 0000 0000  ',
      address: {
        id: 5,
        line1: '  Street  ',
        line2: '',
        line3: '',
        line4: '',
        countryIsoCode: ' mt ',
      },
    });

    expect(payload.name).toBe('EC Malta');
    expect(payload.websiteUrl).toBe('https://ecenglish.com/en/malta/');
    expect(payload.address?.countryISOCode).toBe('MT');
    expect(payload.divisionReportTexts).toEqual([]);
  });

  it('builds update payload and preserves existing division report texts', () => {
    const payload = mapFormValuesToUpdateDto(
      {
        ...createEmptyDivisionFormValues(),
        name: 'EC London',
        websiteUrl: 'https://ecenglish.com/en/london/',
        visaLetterNote: 'Updated note',
        visaLetterNoteFormat: ContentFormat.PlainText,
        headOfficeEmailAddress: 'hello@ecenglish.com',
        headOfficeTelephoneNo: '+44 20 0000 0000',
      },
      [
        {
          id: 41,
          reportTextId: 7,
          divisionId: 2,
          centreId: null,
          content: 'Keep existing text',
          format: ContentFormat.Html,
          createdOn: '2026-03-01T10:00:00Z',
          createdBy: 'Alice',
          lastModifiedOn: '2026-03-02T10:00:00Z',
          lastModifiedBy: 'Bob',
          isDeleted: false,
        },
      ],
    );

    expect(payload.divisionReportTexts).toEqual([
      {
        id: 41,
        reportTextId: 7,
        divisionId: 2,
        centreId: null,
        content: 'Keep existing text',
        format: 1,
        createdOn: '2026-03-01T10:00:00Z',
        createdBy: 'Alice',
        lastModifiedOn: '2026-03-02T10:00:00Z',
        lastModifiedBy: 'Bob',
        isDeleted: false,
      },
    ]);
  });
});
