import { describe, expect, it } from 'vitest';
import { ContentFormatDto } from '../../api/dto';
import { ContentFormat } from '../content-format';
import {
  createEmptyDivisionFormValues,
  mapFormValuesToCreateDto,
  mapFormValuesToUpdateDto,
} from '../mappers';

describe('division payload mappers', () => {
  it('builds create payload with trimmed values and backend content format values', () => {
    const payload = mapFormValuesToCreateDto({
      ...createEmptyDivisionFormValues(),
      name: '  EC Malta  ',
      websiteUrl: '  https://ecenglish.com/en/malta/  ',
      headOfficeEmail: '  hello@ecenglish.com  ',
      headOfficeTelephoneNo: '  +356 0000 0000  ',
      contactAddress: {
        street: '  Street  ',
        district: '',
        city: '',
        postalCode: '',
        countryId: '2',
      },
      accreditationBanner: {
        imageBase64: 'base64-banner',
        contentType: 'image/png',
        fileName: 'banner.png',
      },
      texts: [
        {
          textId: 41,
          contentTemplateId: '10',
          audienceId: '',
          content: '  Keep existing text  ',
          format: ContentFormat.Html,
        },
      ],
    });

    expect(ContentFormatDto).toEqual({
      None: 0,
      PlainText: 1,
      Html: 2,
    });
    expect(payload.name).toBe('EC Malta');
    expect(payload.websiteUrl).toBe('https://ecenglish.com/en/malta/');
    expect(payload.headOfficeEmail).toBe('hello@ecenglish.com');
    expect(payload.contactAddress).toEqual({
      street: 'Street',
      district: null,
      city: null,
      postalCode: null,
      countryId: 2,
    });
    expect(payload.accreditationBanner).toEqual({
      data: 'base64-banner',
      contentType: 'image/png',
      fileName: 'banner.png',
    });
    expect(payload.texts).toEqual([
      {
        contentTemplateId: 10,
        audienceId: null,
        content: 'Keep existing text',
        format: ContentFormatDto.Html,
      },
    ]);
  });

  it('omits empty address and banner objects', () => {
    const payload = mapFormValuesToCreateDto({
      ...createEmptyDivisionFormValues(),
      name: 'EC London',
      websiteUrl: 'https://ecenglish.com/en/london/',
    });

    expect(payload.contactAddress).toBeNull();
    expect(payload.accreditationBanner).toBeNull();
    expect(payload.texts).toEqual([]);
  });

  it('builds update payload with version and preserved texts from form values', () => {
    const payload = mapFormValuesToUpdateDto(
      {
        ...createEmptyDivisionFormValues(),
        name: 'EC London',
        websiteUrl: 'https://ecenglish.com/en/london/',
        texts: [
          {
            textId: 91,
            contentTemplateId: '11',
            audienceId: '2',
            content: 'Keep existing text',
            format: ContentFormat.PlainText,
          },
        ],
      },
      'AAAAAAAAB9E=',
    );

    expect(payload.version).toBe('AAAAAAAAB9E=');
    expect(payload.texts).toEqual([
      {
        contentTemplateId: 11,
        audienceId: 2,
        content: 'Keep existing text',
        format: ContentFormatDto.PlainText,
      },
    ]);
  });
});
