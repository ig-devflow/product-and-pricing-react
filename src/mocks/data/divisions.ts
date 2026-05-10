import {
  ContentFormatDto,
  type CreateDivisionRequestDto,
  type DivisionDetailsDto,
  type DivisionListItemDto,
  type PagedResultDto,
  type TextContentRequestDto,
  type UpdateDivisionRequestDto,
} from '@/modules/divisions/api/dto';

const baseBanner = {
  data:
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9pQxWb8AAAAASUVORK5CYII=',
  contentType: 'image/png',
  fileName: 'division.png',
};

const textTemplateNames = new Map([
  [10, 'Visa letter note'],
  [11, 'Arrival instructions'],
]);

const audienceNames = new Map([
  [1, 'Student'],
  [2, 'Agent'],
]);

const versionToken = 'AAAAAAAAB9E=';

function createListItem(id: number, name: string): DivisionListItemDto {
  return {
    id,
    name,
    isActive: true,
  };
}

function mapTextRequestToDetails(
  text: TextContentRequestDto,
  index: number,
): DivisionDetailsDto['texts'][number] {
  return {
    id: index + 1,
    contentTemplateId: text.contentTemplateId,
    contentTemplateName:
      textTemplateNames.get(text.contentTemplateId) ?? `Template #${text.contentTemplateId}`,
    audienceId: text.audienceId,
    audienceName: text.audienceId ? (audienceNames.get(text.audienceId) ?? null) : null,
    content: text.content ?? '',
    format: text.format,
  };
}

function createDetails(id: number, name: string): DivisionDetailsDto {
  return {
    id,
    name,
    termsAndConditions: 'Terms',
    groupsPaymentTerms: 'Groups terms',
    isActive: true,
    websiteUrl: `https://${name.toLowerCase().replace(/\s+/g, '')}.example.com`,
    contactAddress: {
      street: `${id} Main Street`,
      district: 'Central',
      city: 'Valletta',
      postalCode: 'VLT 1000',
      countryId: 2,
    },
    accreditationBanner: baseBanner,
    headOfficeEmail: 'hello@ecenglish.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    texts: [
      {
        id: 1,
        contentTemplateId: 10,
        contentTemplateName: 'Visa letter note',
        audienceId: null,
        audienceName: null,
        content: 'Visa note',
        format: ContentFormatDto.PlainText,
      },
    ],
    version: versionToken,
  };
}

const initialList = [createListItem(7, 'EC Malta')];
const initialDetails = new Map<number, DivisionDetailsDto>([
  [7, createDetails(7, 'EC Malta')],
]);

let list = structuredClone(initialList);
let details = new Map(initialDetails);

function createPagedResult(
  items: DivisionListItemDto[],
  page: number,
  pageSize: number,
): PagedResultDto<DivisionListItemDto> {
  const startIndex = (page - 1) * pageSize;

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    totalCount: items.length,
    page,
    pageSize,
  };
}

export const divisionFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const search = params.search?.trim().toLowerCase() ?? '';
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 12;
    const filteredList = search
      ? list.filter((item) => item.name.toLowerCase().includes(search))
      : list;

    return createPagedResult(filteredList, page, pageSize);
  },
  getById: (id: number) => details.get(id) ?? null,
  reset: () => {
    list = structuredClone(initialList);
    details = new Map(initialDetails);
  },
  create: (payload: CreateDivisionRequestDto) => {
    const nextId = Math.max(0, ...list.map((item) => item.id)) + 1;
    const detail: DivisionDetailsDto = {
      ...createDetails(nextId, payload.name),
      name: payload.name,
      isActive: payload.isActive,
      websiteUrl: payload.websiteUrl,
      contactAddress: payload.contactAddress,
      accreditationBanner: payload.accreditationBanner,
      termsAndConditions: payload.termsAndConditions,
      groupsPaymentTerms: payload.groupsPaymentTerms,
      headOfficeEmail: payload.headOfficeEmail,
      headOfficeTelephoneNo: payload.headOfficeTelephoneNo,
      texts: payload.texts.map(mapTextRequestToDetails),
      version: versionToken,
    };

    list = [createListItem(nextId, payload.name), ...list];
    details.set(nextId, detail);

    return detail;
  },
  update: (id: number, payload: UpdateDivisionRequestDto) => {
    const existing = details.get(id);
    if (!existing) {
      return null;
    }

    const updated: DivisionDetailsDto = {
      ...existing,
      name: payload.name,
      isActive: payload.isActive,
      websiteUrl: payload.websiteUrl,
      termsAndConditions: payload.termsAndConditions,
      groupsPaymentTerms: payload.groupsPaymentTerms,
      contactAddress: payload.contactAddress,
      accreditationBanner: payload.accreditationBanner,
      headOfficeEmail: payload.headOfficeEmail,
      headOfficeTelephoneNo: payload.headOfficeTelephoneNo,
      texts: payload.texts.map(mapTextRequestToDetails),
      version: payload.version,
    };

    details.set(id, updated);
    list = list.map((item) =>
      item.id === id
        ? {
            id,
            name: updated.name,
            isActive: updated.isActive,
          }
        : item,
    );

    return updated;
  },
};
