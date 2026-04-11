import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useApiErrorMessage } from '@/shared/composables/useApiErrorMessage';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { createEmptyDivisionFormValues } from '@/modules/divisions/model/mappers';
import { useSaveDivisionMutation } from '@/modules/divisions/queries/useSaveDivisionMutation';
import { useDivisionPageHeader } from './useDivisionPageHeader';

export const useDivisionCreatePage = () => {
  const navigate = useNavigate();
  const pageHeader = useDivisionPageHeader('create');
  const saveMutation = useSaveDivisionMutation();
  const saveErrorMessage = useApiErrorMessage(
    saveMutation.error,
    'Failed to save division.',
  );

  return {
    pageHeader,
    initialValues: createEmptyDivisionFormValues(),
    submitLabel: 'Create division',
    isSaving: saveMutation.isPending,
    saveErrorMessage,
    handleSubmit: async (values: DivisionFormValues) => {
      await saveMutation.mutateAsync({
        mode: 'create',
        values,
      });
      navigate(DIVISION_MANAGER_ROUTES.list);
    },
    handleCancel: () => navigate(DIVISION_MANAGER_ROUTES.list),
  };
};
