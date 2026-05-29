import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { AddOnFormValues } from '../model/form.types';
import { createEmptyAddOnFormValues, mapAddOnFormValuesToCreateDto } from '../model/mappers';
import { useCreateAddOnMutation } from '../queries/useCreateAddOnMutation';
import { addonPageHeaders } from '../config/pageHeaders';

export const useAddOnCreateScreen = () => {
  const navigate = useNavigate();
  const createMutation = useCreateAddOnMutation();
  const initialValues = useMemo(() => createEmptyAddOnFormValues(), []);

  return {
    pageHeader: addonPageHeaders.create,
    initialValues,
    submitLabel: 'Create add-on',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save add-on.'),
    handleSubmit: async (values: AddOnFormValues) => {
      const result = await createMutation.mutateAsync(mapAddOnFormValuesToCreateDto(values));
      navigate(PRODUCT_MANAGER_ROUTES.addons.details(result.id));
    },
    handleCancel: () => navigate(PRODUCT_MANAGER_ROUTES.addons.list),
  };
};
