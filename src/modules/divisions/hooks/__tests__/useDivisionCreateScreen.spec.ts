import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContentFormat } from '@/modules/divisions/model/content-format';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import { useDivisionCreateScreen } from '@/modules/divisions/hooks/useDivisionCreateScreen';

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

describe('useDivisionCreateScreen', () => {
  it('passes create mode and navigates to list after save', async () => {
    const { result } = renderHook(() => useDivisionCreateScreen());

    const values: DivisionFormValues = {
      name: 'EC Dublin',
      isActive: true,
      websiteUrl: 'https://dublin.example.com',
      headOfficeEmailAddress: 'dublin@ecenglish.com',
      headOfficeTelephoneNo: '+353 1 234 5678',
      address: {
        id: null,
        line1: 'Grand Canal Quay',
        line2: '',
        line3: '',
        line4: '',
        countryIsoCode: 'ie',
      },
      visaLetterNoteFormat: ContentFormat.PlainText,
      visaLetterNote: 'Visa note',
      termsAndConditions: 'Terms',
      groupsPaymentTerms: 'Groups terms',
      accreditationBanner: null,
    };

    await result.current.handleSubmit(values);

    expect(mutateAsyncMock).toHaveBeenCalledWith({
      name: 'EC Dublin',
      isActive: true,
      websiteUrl: 'https://dublin.example.com',
      headOfficeEmailAddress: 'dublin@ecenglish.com',
      headOfficeTelephoneNo: '+353 1 234 5678',
      termsAndConditions: 'Terms',
      groupsPaymentTerms: 'Groups terms',
      visaLetterNote: 'Visa note',
      visaLetterNoteFormat: 0,
      address: {
        id: null,
        line1: 'Grand Canal Quay',
        line2: '',
        line3: '',
        line4: '',
        countryISOCode: 'IE',
      },
      accreditationBanner: null,
      divisionReportTexts: [],
    });
    expect(navigateMock).toHaveBeenCalledWith('/division-manager');
  });
});
