import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import type { AddOnFormValues } from '../model/form.types';
import {
  createEmptyAddOnFormValues,
  mapAddOnDetailsToFormValues,
  mapAddOnFormValuesToUpdateDto,
} from '../model/mappers';
import { useAddOnDetailsQuery } from '../queries/useAddOnDetailsQuery';
import { useUpdateAddOnMutation } from '../queries/useUpdateAddOnMutation';
import { addonPageHeaders } from '../config/pageHeaders';
import { useAddOnRouteId } from './useAddOnRouteId';

export const useAddOnEditScreen = () => {
  const navigate = useNavigate();
  const addonId = useAddOnRouteId();
  const query = useAddOnDetailsQuery(addonId);
  const updateMutation = useUpdateAddOnMutation();
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load add-on.',
  });

  const defaultValues = useMemo(
    () => pageState.data ? mapAddOnDetailsToFormValues(pageState.data) : createEmptyAddOnFormValues(),
    [pageState.data],
  );

  return {
    pageHeader: addonPageHeaders.edit,
    submitLabel: 'Save changes',
    addonId,
    details: pageState.data,
    detailsQuery: query,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveErrorMessage: getApiErrorMessage(updateMutation.error, 'Failed to save add-on.'),
    initialValues: defaultValues,
    onSubmit: async (values: AddOnFormValues) => {
      if (addonId === null || !pageState.data) return;
      await updateMutation.mutateAsync({
        id: addonId,
        payload: mapAddOnFormValuesToUpdateDto(values, pageState.data.version),
      });
      navigate(PRODUCT_MANAGER_ROUTES.addons.details(addonId));
    },
    onCancel: () => {
      if (addonId !== null) navigate(PRODUCT_MANAGER_ROUTES.addons.details(addonId));
      else navigate(PRODUCT_MANAGER_ROUTES.addons.list);
    },
  };
};
