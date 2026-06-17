import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { AccommodationFormValues } from '../model/form.types';
import {
  createEmptyAccommodationFormValues,
  mapAccommodationFormValuesToCreateDto,
} from '../model/mappers';
import { useCreateAccommodationMutation } from '../queries/useCreateAccommodationMutation';
import { accommodationPageHeaders } from '../config/pageHeaders';

export const useAccommodationCreateScreen = () => {
  const navigate = useNavigate();
  const createMutation = useCreateAccommodationMutation();
  const initialValues = useMemo(() => createEmptyAccommodationFormValues(), []);

  return {
    pageHeader: accommodationPageHeaders.create,
    initialValues,
    submitLabel: 'Create accommodation',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save accommodation.'),
    handleSubmit: async (values: AccommodationFormValues) => {
      const result = await createMutation.mutateAsync(
        mapAccommodationFormValuesToCreateDto(values),
      );
      navigate(PRODUCT_MANAGER_ROUTES.accommodations.details(result.id));
    },
    handleCancel: () => navigate(PRODUCT_MANAGER_ROUTES.accommodations.list),
  };
};
