import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useApiErrorMessage } from '@/shared/hooks/useApiErrorMessage';
import type { DivisionFormValues } from '@/modules/divisions/model/types';
import {
  createEmptyDivisionFormValues,
  mapFormValuesToCreateDto,
} from '@/modules/divisions/model/mappers';
import { useCreateDivisionMutation } from '@/modules/divisions/queries/useCreateDivisionMutation';
import { useDivisionPageHeader } from './useDivisionPageHeader';

export const useDivisionCreatePage = () => {
  const navigate = useNavigate();
  const pageHeader = useDivisionPageHeader('create');
  const createMutation = useCreateDivisionMutation();
  const saveErrorMessage = useApiErrorMessage(
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
