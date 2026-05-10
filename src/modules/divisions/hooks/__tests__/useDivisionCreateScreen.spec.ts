import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContentFormatDto } from '@/modules/divisions/api/dto';
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
  it('passes create payload and navigates to list after save', async () => {
    const { result } = renderHook(() => useDivisionCreateScreen());

    const values: DivisionFormValues = {
      name: 'EC Dublin',
      isActive: true,
      websiteUrl: 'https://dublin.example.com',
      headOfficeEmail: 'dublin@ecenglish.com',
      headOfficeTelephoneNo: '+353 1 234 5678',
      contactAddress: {
        street: 'Grand Canal Quay',
        district: '',
        city: '',
        postalCode: '',
        countryId: '1',
      },
      termsAndConditions: 'Terms',
      groupsPaymentTerms: 'Groups terms',
      accreditationBanner: null,
      texts: [
        {
          textId: null,
          contentTemplateId: '10',
          audienceId: '',
          content: 'Visa note',
          format: ContentFormat.PlainText,
        },
      ],
    };

    await result.current.handleSubmit(values);

    expect(mutateAsyncMock).toHaveBeenCalledWith({
      name: 'EC Dublin',
      isActive: true,
      websiteUrl: 'https://dublin.example.com',
      headOfficeEmail: 'dublin@ecenglish.com',
      headOfficeTelephoneNo: '+353 1 234 5678',
      termsAndConditions: 'Terms',
      groupsPaymentTerms: 'Groups terms',
      contactAddress: {
        street: 'Grand Canal Quay',
        district: null,
        city: null,
        postalCode: null,
        countryId: 1,
      },
      accreditationBanner: null,
      texts: [
        {
          contentTemplateId: 10,
          audienceId: null,
          content: 'Visa note',
          format: ContentFormatDto.PlainText,
        },
      ],
    });
    expect(navigateMock).toHaveBeenCalledWith('/division-manager');
  });
});
