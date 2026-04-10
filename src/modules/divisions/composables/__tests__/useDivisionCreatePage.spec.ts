import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { useDivisionCreatePage } from '@/modules/divisions/composables/useDivisionCreatePage';

const navigateMock = vi.fn();
const mutateAsyncMock = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/modules/divisions/queries/useCreateDivisionMutation', () => ({
  useCreateDivisionMutation: () => ({
    isPending: false,
    error: null,
    mutateAsync: mutateAsyncMock,
  }),
}));

describe('useDivisionCreatePage', () => {
  it('maps form values to payload and navigates to list after create', async () => {
    const { result } = renderHook(() => useDivisionCreatePage());

    const values: DivisionFormValues = {
      name: 'EC Dublin',
      websiteUrl: 'https://dublin.example.com',
      headOfficeEmailAddress: 'dublin@ecenglish.com',
      headOfficeTelephoneNo: '+353 1 234 5678',
      addressLine1: 'Grand Canal Quay',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      countryISOCode: 'ie',
      visaLetterNoteFormat: 0,
      visaLetterNote: 'Visa note',
      termsAndConditions: 'Terms',
      groupsPaymentTerms: 'Groups terms',
    };

    await result.current.onSubmit(values);

    expect(mutateAsyncMock).toHaveBeenCalledWith({
      name: 'EC Dublin',
      websiteUrl: 'https://dublin.example.com',
      headOfficeEmailAddress: 'dublin@ecenglish.com',
      headOfficeTelephoneNo: '+353 1 234 5678',
      address: {
        line1: 'Grand Canal Quay',
        line2: '',
        line3: '',
        line4: '',
        countryISOCode: 'IE',
      },
      visaLetterNoteFormat: 0,
      visaLetterNote: 'Visa note',
      termsAndConditions: 'Terms',
      groupsPaymentTerms: 'Groups terms',
    });
    expect(navigateMock).toHaveBeenCalledWith('/division-manager');
  });
});
