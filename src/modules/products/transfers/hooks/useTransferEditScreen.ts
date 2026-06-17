import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import type { TransferFormValues } from '../model/form.types';
import {
  createEmptyTransferFormValues,
  mapTransferDetailsToFormValues,
  mapTransferFormValuesToUpdateDto,
} from '../model/mappers';
import { useTransferDetailsQuery } from '../queries/useTransferDetailsQuery';
import { useUpdateTransferMutation } from '../queries/useUpdateTransferMutation';
import { transferPageHeaders } from '../config/pageHeaders';
import { useTransferRouteId } from './useTransferRouteId';

export const useTransferEditScreen = () => {
  const navigate = useNavigate();
  const { divisionId, divisionName } = useDivisionContext();
  const transferId = useTransferRouteId();
  const query = useTransferDetailsQuery(transferId);
  const updateMutation = useUpdateTransferMutation();
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load transfer.',
  });

  const defaultValues = useMemo(
    () => pageState.data ? mapTransferDetailsToFormValues(pageState.data) : createEmptyTransferFormValues(),
    [pageState.data],
  );

  return {
    pageHeader: transferPageHeaders.edit,
    submitLabel: 'Save changes',
    transferId,
    divisionId,
    divisionName,
    details: pageState.data,
    detailsQuery: query,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveErrorMessage: getApiErrorMessage(updateMutation.error, 'Failed to save transfer.'),
    initialValues: defaultValues,
    onSubmit: async (values: TransferFormValues) => {
      if (transferId === null || !pageState.data) return;
      await updateMutation.mutateAsync({
        id: transferId,
        payload: mapTransferFormValuesToUpdateDto(values, pageState.data.version),
      });
      navigate(PRODUCT_MANAGER_ROUTES.transfers.details(transferId));
    },
    onCancel: () => {
      if (transferId !== null) navigate(PRODUCT_MANAGER_ROUTES.transfers.details(transferId));
      else navigate(PRODUCT_MANAGER_ROUTES.transfers.list);
    },
  };
};
