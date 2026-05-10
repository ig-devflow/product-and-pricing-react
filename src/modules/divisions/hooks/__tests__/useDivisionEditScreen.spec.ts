import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContentFormatDto } from '@/modules/divisions/api/dto';
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
  contactAddress: {
    street: '7 Main Street',
    district: '',
    city: '',
    postalCode: '',
    countryId: 2,
  },
  accreditationBanner: null,
  headOfficeEmail: 'hello@ecenglish.com',
  headOfficeTelephoneNo: '+356 1234 5678',
  texts: [
    {
      id: 91,
      contentTemplateId: 10,
      contentTemplateName: 'Visa letter note',
      audienceId: null,
      audienceName: '',
      content: 'Existing text',
      format: ContentFormat.Html,
    },
  ],
  version: 'AAAAAAAAB9E=',
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
  it('provides mapped initial values and submits update payload with version', async () => {
    const { result } = renderHook(() => useDivisionEditScreen());

    expect(result.current.initialValues.name).toBe('EC Malta');
    expect(result.current.initialValues.contactAddress.countryId).toBe('2');

    const values: DivisionFormValues = {
      ...result.current.initialValues,
      name: 'EC Malta Updated',
      texts: result.current.initialValues.texts,
    };

    await result.current.onSubmit(values);

    expect(mutateAsyncMock).toHaveBeenCalledWith({
      divisionId: 7,
      payload: expect.objectContaining({
        name: 'EC Malta Updated',
        version: 'AAAAAAAAB9E=',
        contactAddress: expect.objectContaining({
          countryId: 2,
        }),
        texts: [
          {
            contentTemplateId: 10,
            audienceId: null,
            content: 'Existing text',
            format: ContentFormatDto.Html,
          },
        ],
      }),
    });

    expect(navigateMock).toHaveBeenCalledWith('/division-manager/7');
  });
});
