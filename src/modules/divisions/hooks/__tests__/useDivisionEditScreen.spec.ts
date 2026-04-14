import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContentFormat } from '@/modules/divisions/model/content-format';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import type { DivisionDetails } from '@/modules/divisions/model/types';
import { useDivisionEditScreen } from '@/modules/divisions/hooks/useDivisionEditScreen';

const navigateMock = vi.fn();
const mutateAsyncMock = vi.fn();

const divisionFixture: DivisionDetails = {
  id: 7,
  name: 'EC Malta',
  websiteUrl: 'https://ecmalta.example.com',
  termsAndConditions: 'Terms',
  groupsPaymentTerms: 'Groups terms',
  isActive: true,
  address: {
    id: 17,
    line1: '7 Main Street',
    line2: '',
    line3: '',
    line4: '',
    countryIsoCode: 'MT',
  },
  accreditationBanner: null,
  visaLetterNote: 'Visa note',
  visaLetterNoteFormat: ContentFormat.Html,
  createdBy: 'test@example.com',
  lastModifiedBy: 'test@example.com',
  createdOn: '2026-04-01T08:00:00Z',
  lastModifiedOn: '2026-04-02T09:30:00Z',
  years: [2026],
  headOfficeEmailAddress: 'hello@ecenglish.com',
  headOfficeTelephoneNo: '+356 1234 5678',
  reportTexts: [
    {
      id: 91,
      reportTextId: 4,
      divisionId: 7,
      centreId: null,
      content: 'Existing report text',
      format: ContentFormat.Html,
      createdOn: '2026-03-01T10:00:00Z',
      createdBy: 'Alice',
      lastModifiedOn: '2026-03-02T10:00:00Z',
      lastModifiedBy: 'Bob',
      isDeleted: false,
    },
  ],
};

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/modules/divisions/hooks/useDivisionRouteId', () => ({
  useDivisionRouteId: () => 7,
}));

vi.mock('@/modules/divisions/queries/useDivisionDetailsQuery', () => ({
  useDivisionDetailsQuery: () => ({
    data: divisionFixture,
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

vi.mock('@/modules/divisions/queries/useUpdateDivisionMutation', () => ({
  useUpdateDivisionMutation: () => ({
    isPending: false,
    error: null,
    mutateAsync: mutateAsyncMock,
  }),
}));

describe('useDivisionEditScreen', () => {
  it('provides mapped initial values and submits update input', async () => {
    const { result } = renderHook(() => useDivisionEditScreen());

    expect(result.current.initialValues.name).toBe('EC Malta');

    const values: DivisionFormValues = {
      ...result.current.initialValues,
      name: 'EC Malta Updated',
      address: {
        ...result.current.initialValues.address,
        countryIsoCode: 'mt',
      },
      visaLetterNote: 'Updated note',
    };

    await result.current.onSubmit(values);

    expect(mutateAsyncMock).toHaveBeenCalledWith({
      divisionId: 7,
      payload: expect.objectContaining({
        name: 'EC Malta Updated',
        visaLetterNote: 'Updated note',
        address: expect.objectContaining({
          countryISOCode: 'MT',
        }),
        divisionReportTexts: expect.arrayContaining([
          expect.objectContaining({
            id: 91,
            reportTextId: 4,
            divisionId: 7,
          }),
        ]),
      }),
    });

    expect(navigateMock).toHaveBeenCalledWith('/division-manager/7');
  });
});
