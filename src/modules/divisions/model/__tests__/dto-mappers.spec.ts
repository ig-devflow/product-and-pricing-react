import { describe, expect, it } from 'vitest';
import { ContentFormatDto } from '../../api/dto';
import { ContentFormat } from '../content-format';
import { mapDivisionDetailsDto, mapDivisionListPageDto } from '../mappers';

describe('division dto mappers', () => {
  it('maps paged list dto without requiring details-only fields', () => {
    const page = mapDivisionListPageDto({
      items: [
        {
          id: 4,
          name: 'EC Malta',
          isActive: true,
          websiteUrl: 'https://ecmalta.example.com',
          headOfficeEmail: 'hello@ecenglish.com',
          city: 'Valletta',
          countryName: 'Malta',
          createdAt: '2026-05-10T14:08:00Z',
          createdByName: 'System User',
          updatedAt: '2026-05-10T15:30:00Z',
          updatedByName: 'Andrei Dzemianchyk',
        },
      ],
      totalCount: 12,
      page: 2,
      pageSize: 1,
    });

    expect(page.items[0]).toMatchObject({
      id: 4,
      name: 'EC Malta',
      isActive: true,
      websiteUrl: 'https://ecmalta.example.com',
      headOfficeEmail: 'hello@ecenglish.com',
      city: 'Valletta',
      countryName: 'Malta',
      websiteDisplayUrl: 'ecmalta.example.com',
      locationText: 'Valletta, Malta',
      createdAtText: '10 May 2026, 14:08',
      createdByText: 'System User',
      updatedAtText: '10 May 2026, 15:30',
      updatedByText: 'Andrei Dzemianchyk',
    });
    expect(page).toMatchObject({
      totalCount: 12,
      page: 2,
      pageSize: 1,
    });
  });

  it('maps details dto and preserves version and text content for edit flow', () => {
    const details = mapDivisionDetailsDto({
      id: 9,
      name: 'EC London',
      termsAndConditions: '  Terms  ',
      groupsPaymentTerms: '  Group terms  ',
      isActive: true,
      websiteUrl: 'https://ecenglish.com/en/london/',
      contactAddress: {
        street: 'Address 1',
        district: 'Address 2',
        city: '',
        postalCode: '',
        countryId: 3,
      },
      accreditationBanner: {
        data: 'banner',
        contentType: 'image/jpeg',
        fileName: 'hero.jpg',
      },
      headOfficeEmail: 'hello@ecenglish.com',
      headOfficeTelephoneNo: '+44 20 0000 0000',
      version: 'AAAAAAAAB9E=',
      createdAt: '2026-05-10T14:08:00Z',
      createdByName: null,
      updatedAt: null,
      updatedByName: null,
      texts: [
        {
          id: 13,
          contentTemplateId: 99,
          contentTemplateName: 'Arrival instructions',
          audienceId: 2,
          audienceName: 'Agent',
          content: 'Existing text',
          format: ContentFormatDto.Html,
        },
      ],
    });

    expect(details.termsAndConditions).toBe('Terms');
    expect(details.groupsPaymentTerms).toBe('Group terms');
    expect(details.version).toBe('AAAAAAAAB9E=');
    expect(details.createdAtText).toBe('10 May 2026, 14:08');
    expect(details.createdByText).toBe('Unknown editor');
    expect(details.updatedAtText).toBe('');
    expect(details.contactAddress).toMatchObject({
      street: 'Address 1',
      countryId: 3,
    });
    expect(details.accreditationBanner?.imageBase64).toBe('banner');
    expect(details.texts).toEqual([
      {
        id: 13,
        contentTemplateId: 99,
        contentTemplateName: 'Arrival instructions',
        audienceId: 2,
        audienceName: 'Agent',
        content: 'Existing text',
        format: ContentFormat.Html,
      },
    ]);
  });
});
