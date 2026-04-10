import type { DivisionDetailsDto, DivisionSummaryDto, DivisionUpsertDto } from '@/modules/divisions/api/dto';

const baseBanner = {
  image:
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9pQxWb8AAAAASUVORK5CYII=',
  contentType: 'image/png',
  fileName: 'division.png',
};

const createSummary = (id: number, name: string): DivisionSummaryDto => ({
  id,
  name,
  termsAndConditions: 'Terms',
  groupsPaymentTerms: 'Groups terms',
  isActive: true,
  websiteUrl: `https://${name.toLowerCase().replace(/\s+/g, '')}.example.com`,
  address: {
    id: 100 + id,
    line1: `${id} Main Street`,
    line2: 'Central',
    line3: 'Valletta',
    line4: 'VLT 1000',
    countryISOCode: 'MT',
  },
  accreditationBanner: baseBanner,
  visaLetterNote: 'Visa note',
  visaLetterNoteFormat: 1,
  createdBy: 'lydiavella@gmail.com',
  lastModifiedBy: 'lydiavella@gmail.com',
});

const createDetails = (id: number, name: string): DivisionDetailsDto => ({
  ...createSummary(id, name),
  createdOn: '2026-04-01T08:00:00Z',
  lastModifiedOn: '2026-04-02T09:30:00Z',
  years: [2026],
  headOfficeEmailAddress: 'hello@ecenglish.com',
  headOfficeTelephoneNo: '+356 1234 5678',
  divisionReportTexts: [],
});

const initialList = [createSummary(7, 'EC Malta')];
const initialDetails = new Map<number, DivisionDetailsDto>([
  [7, createDetails(7, 'EC Malta')],
]);

let list = structuredClone(initialList);
let details = new Map(initialDetails);

export const divisionFixtures = {
  getList: () => list,
  getById: (id: number) => details.get(id) ?? null,
  reset: () => {
    list = structuredClone(initialList);
    details = new Map(initialDetails);
  },
  create: (payload: DivisionUpsertDto) => {
    const nextId = Math.max(0, ...list.map((item) => item.id)) + 1;
    const summary = createSummary(nextId, payload.name);
    const detail = createDetails(nextId, payload.name);

    const mergedSummary: DivisionSummaryDto = {
      ...summary,
      name: payload.name,
      websiteUrl: payload.websiteUrl,
      address: payload.address,
      termsAndConditions: payload.termsAndConditions,
      groupsPaymentTerms: payload.groupsPaymentTerms,
      visaLetterNote: payload.visaLetterNote,
      visaLetterNoteFormat: payload.visaLetterNoteFormat,
    };

    const mergedDetail: DivisionDetailsDto = {
      ...detail,
      ...mergedSummary,
      headOfficeEmailAddress: payload.headOfficeEmailAddress,
      headOfficeTelephoneNo: payload.headOfficeTelephoneNo,
    };

    list = [mergedSummary, ...list];
    details.set(nextId, mergedDetail);

    return mergedDetail;
  },
  update: (id: number, payload: DivisionUpsertDto) => {
    const existing = details.get(id);
    if (!existing) {
      return null;
    }

    const updated: DivisionDetailsDto = {
      ...existing,
      name: payload.name,
      websiteUrl: payload.websiteUrl,
      termsAndConditions: payload.termsAndConditions,
      groupsPaymentTerms: payload.groupsPaymentTerms,
      visaLetterNoteFormat: payload.visaLetterNoteFormat,
      visaLetterNote: payload.visaLetterNote,
      address: payload.address,
      headOfficeEmailAddress: payload.headOfficeEmailAddress,
      headOfficeTelephoneNo: payload.headOfficeTelephoneNo,
      lastModifiedOn: new Date().toISOString(),
    };

    details.set(id, updated);
    list = list.map((item) => (item.id === id ? { ...item, ...updated } : item));

    return updated;
  },
};
