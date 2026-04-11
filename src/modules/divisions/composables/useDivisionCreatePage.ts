import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { mapDivisionFormValuesToPayload } from '@/modules/divisions/model/mappers';
import { createDivisionFormDefaults } from '@/modules/divisions/model/factory';
import { useCreateDivisionMutation } from '@/modules/divisions/queries/useCreateDivisionMutation';

export const useDivisionCreatePage = () => {
  const navigate = useNavigate();
  const createMutation = useCreateDivisionMutation();

  return {
    title: 'Create division',
    submitLabel: 'Create division',
    defaultValues: createDivisionFormDefaults(),
    isSubmitting: createMutation.isPending,
    errorMessage:
      createMutation.error instanceof Error ? createMutation.error.message : null,
    onSubmit: async (values: DivisionFormValues) => {
      const payload = mapDivisionFormValuesToPayload(values);
      await createMutation.mutateAsync(payload);
      navigate(DIVISION_MANAGER_ROUTES.list);
    },
    onCancel: () => navigate(DIVISION_MANAGER_ROUTES.list),
  };
};
