import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { DivisionFormValues } from '@/modules/divisions/model/types';
import {
  createEmptyDivisionFormValues,
  mapFormValuesToCreateDto,
} from '@/modules/divisions/model/mappers';
import { useCreateDivisionMutation } from '@/modules/divisions/queries/useCreateDivisionMutation';
import { divisionPageHeaders } from '@/modules/divisions/config/page-headers';

export const useDivisionCreatePage = () => {
  const navigate = useNavigate();
  const pageHeader = divisionPageHeaders.create;
  const createMutation = useCreateDivisionMutation();
  const saveErrorMessage = getApiErrorMessage(
    createMutation.error,
    'Failed to save division.',
  );

  return {
    pageHeader,
    initialValues: createEmptyDivisionFormValues(),
    submitLabel: 'Create division',
    isSaving: createMutation.isPending,
    saveErrorMessage,
    handleSubmit: async (values: DivisionFormValues) => {
      await createMutation.mutateAsync(mapFormValuesToCreateDto(values));
      navigate(DIVISION_MANAGER_ROUTES.list);
    },
    handleCancel: () => navigate(DIVISION_MANAGER_ROUTES.list),
  };
};
