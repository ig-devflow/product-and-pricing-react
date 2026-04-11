import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { DivisionDetails } from '@/modules/divisions/model/division';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { DivisionVisaLetterNoteFormat } from '@/modules/divisions/model/division';
import { useDivisionEditPage } from '@/modules/divisions/composables/useDivisionEditPage';

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
    line1: '7 Main Street',
    line2: '',
    line3: '',
    line4: '',
    countryISOCode: 'MT',
  },
  accreditationBanner: null,
  visaLetterNote: 'Visa note',
  visaLetterNoteFormat: DivisionVisaLetterNoteFormat.RichText,
  createdBy: 'test@example.com',
  lastModifiedBy: 'test@example.com',
  createdOn: '2026-04-01T08:00:00Z',
  lastModifiedOn: '2026-04-02T09:30:00Z',
  years: [2026],
  headOfficeEmailAddress: 'hello@ecenglish.com',
  headOfficeTelephoneNo: '+356 1234 5678',
};

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/modules/divisions/composables/useDivisionRouteId', () => ({
  useDivisionRouteId: () => 7,
}));

vi.mock('@/modules/divisions/queries/useDivisionDetailsQuery', () => ({
  useDivisionDetailsQuery: () => ({
    data: divisionFixture,
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

vi.mock('@/modules/divisions/queries/useUpdateDivisionMutation', () => ({
  useUpdateDivisionMutation: () => ({
    isPending: false,
    error: null,
    mutateAsync: mutateAsyncMock,
  }),
}));

describe('useDivisionEditPage', () => {
  it('provides mapped default values and submits update payload', async () => {
    const { result } = renderHook(() => useDivisionEditPage());

    expect(result.current.defaultValues.name).toBe('EC Malta');

    const values: DivisionFormValues = {
      ...result.current.defaultValues,
      name: 'EC Malta Updated',
      countryISOCode: 'mt',
      visaLetterNote: 'Updated note',
    };

    await result.current.onSubmit(values);

    expect(mutateAsyncMock).toHaveBeenCalledWith({
      divisionId: 7,
      payload: {
        name: 'EC Malta Updated',
        websiteUrl: 'https://ecmalta.example.com',
        headOfficeEmailAddress: 'hello@ecenglish.com',
        headOfficeTelephoneNo: '+356 1234 5678',
        address: {
          line1: '7 Main Street',
          line2: '',
          line3: '',
          line4: '',
          countryISOCode: 'MT',
        },
        visaLetterNoteFormat: 1,
        visaLetterNote: 'Updated note',
        termsAndConditions: 'Terms',
        groupsPaymentTerms: 'Groups terms',
      },
    });

    expect(navigateMock).toHaveBeenCalledWith('/division-manager/7');
  });
});
