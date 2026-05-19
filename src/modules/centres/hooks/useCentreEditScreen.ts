import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { CENTRE_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { centrePageHeaders } from '@/modules/centres/config/pageHeaders';
import { createEmptyCentreFormValues, mapCentreDetailsToFormValues } from '@/modules/centres/model/form.mappers';
import { mapFormValuesToUpdateDto } from '@/modules/centres/model/payload.mappers';
import { useCentreDetailsQuery } from '@/modules/centres/queries/useCentreDetailsQuery';
import { useUpdateCentreMutation } from '@/modules/centres/queries/useUpdateCentreMutation';
import type { CentreFormValues } from '@/modules/centres/model/form.types';
import { useCentreRouteId } from './useCentreRouteId';

export const useCentreEditScreen = () => {
  const navigate = useNavigate();
  const pageHeader = centrePageHeaders.edit;
  const centreId = useCentreRouteId();
  const centreQuery = useCentreDetailsQuery(centreId);
  const updateMutation = useUpdateCentreMutation();
  const pageState = buildResourcePageState({
    data: centreQuery.data,
    isLoading: centreQuery.isLoading,
    error: centreQuery.error,
    fallbackErrorMessage: 'Failed to load centre.',
  });

  const initialValues = useMemo(
    () =>
      pageState.data
        ? mapCentreDetailsToFormValues(pageState.data)
        : createEmptyCentreFormValues(),
    [pageState.data],
  );

  const handleSubmit = async (values: CentreFormValues) => {
    if (centreId === null || !pageState.data) return;

    await updateMutation.mutateAsync({
      centreId,
      payload: mapFormValuesToUpdateDto(values, centreId, pageState.data.version),
    });
    navigate(CENTRE_MANAGER_ROUTES.details(centreId));
  };

  const handleCancel = () => {
    if (centreId !== null) {
      navigate(CENTRE_MANAGER_ROUTES.details(centreId));
    } else {
      navigate(CENTRE_MANAGER_ROUTES.list);
    }
  };

  return {
    pageHeader,
    centreId,
    centreQuery,
    centre: pageState.data,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
    initialValues,
    handleSubmit,
    handleCancel,
  };
};
