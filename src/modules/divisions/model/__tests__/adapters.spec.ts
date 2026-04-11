import { describe, expect, it } from 'vitest';
import { ContentFormatDto } from '../../api/dto';
import { mapDivisionDetailsDto, mapDivisionSummaryDto } from '../adapters';

describe('division adapters', () => {
  it('maps division summary dto to list item display fields', () => {
    const item = mapDivisionSummaryDto({
      id: 4,
      name: 'EC Malta',
      isActive: true,
      websiteUrl: 'https://www.ecenglish.com/en/malta/',
      address: {
        id: 7,
        line1: 'Marguerite Mangion Street',
        line2: 'St Julians',
        line3: '',
        line4: '',
        countryISOCode: 'MT',
      },
      accreditationBanner: {
        image: 'base64-banner',
        contentType: 'image/png',
        fileName: 'banner.png',
      },
      visaLetterNoteFormat: ContentFormatDto.Html,
      createdBy: 'Alice',
      lastModifiedBy: 'Bob',
    });

    expect(item.websiteDisplayUrl).toBe('ecenglish.com/en/malta/');
    expect(item.addressText).toBe('Marguerite Mangion Street, St Julians, MT');
    expect(item.banner?.fileName).toBe('banner.png');
  });

  it('maps details dto and preserves report texts for edit flow', () => {
    const details = mapDivisionDetailsDto({
      id: 9,
      name: 'EC London',
      termsAndConditions: '  Terms  ',
      groupsPaymentTerms: '  Group terms  ',
      isActive: true,
      websiteUrl: 'https://ecenglish.com/en/london/',
      address: {
        id: 1,
        line1: 'Address 1',
        line2: 'Address 2',
        line3: '',
        line4: '',
        countryISOCode: 'GB',
      },
      accreditationBanner: {
        image: 'banner',
        contentType: 'image/jpeg',
        fileName: 'hero.jpg',
      },
      visaLetterNote: '  Bring visa docs  ',
      visaLetterNoteFormat: ContentFormatDto.PlainText,
      createdOn: '2026-04-01T10:00:00Z',
      createdBy: 'Alice',
      lastModifiedOn: '2026-04-02T10:00:00Z',
      lastModifiedBy: 'Bob',
      years: [2025, 2026],
      headOfficeEmailAddress: 'hello@ecenglish.com',
      headOfficeTelephoneNo: '+44 20 0000 0000',
      divisionReportTexts: [
        {
          id: 13,
          reportTextId: 99,
          divisionId: 9,
          centreId: null,
          content: 'Existing report text',
          format: ContentFormatDto.Html,
          createdOn: '2026-03-01T10:00:00Z',
          createdBy: 'Alice',
          lastModifiedOn: '2026-03-02T10:00:00Z',
          lastModifiedBy: 'Bob',
          isDeleted: false,
        },
      ],
    });

    expect(details.termsAndConditions).toBe('Terms');
    expect(details.groupsPaymentTerms).toBe('Group terms');
    expect(details.visaLetterNote).toBe('Bring visa docs');
    expect(details.reportTexts).toHaveLength(1);
    expect(details.reportTexts[0]).toMatchObject({
      id: 13,
      reportTextId: 99,
      content: 'Existing report text',
      divisionId: 9,
    });
  });
});
