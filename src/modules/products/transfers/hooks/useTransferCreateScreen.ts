import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { TransferFormValues } from '../model/form.types';
import { createEmptyTransferFormValues, mapTransferFormValuesToCreateDto } from '../model/mappers';
import { useCreateTransferMutation } from '../queries/useCreateTransferMutation';
import { transferPageHeaders } from '../config/pageHeaders';

export const useTransferCreateScreen = () => {
  const navigate = useNavigate();
  const createMutation = useCreateTransferMutation();
  const initialValues = useMemo(() => createEmptyTransferFormValues(), []);

  return {
    pageHeader: transferPageHeaders.create,
    initialValues,
    submitLabel: 'Create transfer',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save transfer.'),
    handleSubmit: async (values: TransferFormValues) => {
      const result = await createMutation.mutateAsync(mapTransferFormValuesToCreateDto(values));
      navigate(PRODUCT_MANAGER_ROUTES.transfers.details(result.id));
    },
    handleCancel: () => navigate(PRODUCT_MANAGER_ROUTES.transfers.list),
  };
};
