import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import type { AccommodationFormValues } from '../model/form.types';
import {
  createEmptyAccommodationFormValues,
  mapAccommodationDetailsToFormValues,
  mapAccommodationFormValuesToUpdateDto,
} from '../model/mappers';
import { useAccommodationDetailsQuery } from '../queries/useAccommodationDetailsQuery';
import { useUpdateAccommodationMutation } from '../queries/useUpdateAccommodationMutation';
import { accommodationPageHeaders } from '../config/pageHeaders';
import { useAccommodationRouteId } from './useAccommodationRouteId';

export const useAccommodationEditScreen = () => {
  const navigate = useNavigate();
  const accommodationId = useAccommodationRouteId();
  const query = useAccommodationDetailsQuery(accommodationId);
  const updateMutation = useUpdateAccommodationMutation();
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load accommodation.',
  });

  const defaultValues = useMemo(
    () =>
      pageState.data
        ? mapAccommodationDetailsToFormValues(pageState.data)
        : createEmptyAccommodationFormValues(),
    [pageState.data],
  );

  return {
    pageHeader: accommodationPageHeaders.edit,
    submitLabel: 'Save changes',
    accommodationId,
    details: pageState.data,
    detailsQuery: query,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveErrorMessage: getApiErrorMessage(updateMutation.error, 'Failed to save accommodation.'),
    initialValues: defaultValues,
    onSubmit: async (values: AccommodationFormValues) => {
      if (accommodationId === null || !pageState.data) return;
      await updateMutation.mutateAsync({
        id: accommodationId,
        payload: mapAccommodationFormValuesToUpdateDto(values, pageState.data.version),
      });
      navigate(PRODUCT_MANAGER_ROUTES.accommodations.details(accommodationId));
    },
    onCancel: () => {
      if (accommodationId !== null)
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.details(accommodationId));
      else navigate(PRODUCT_MANAGER_ROUTES.accommodations.list);
    },
  };
};
