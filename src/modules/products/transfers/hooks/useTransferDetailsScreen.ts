import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { transferPageHeaders } from '../config/pageHeaders';
import { useTransferDetailsQuery } from '../queries/useTransferDetailsQuery';
import { useTransferRouteId } from './useTransferRouteId';

export const useTransferDetailsScreen = () => {
  const navigate = useNavigate();
  const transferId = useTransferRouteId();
  const query = useTransferDetailsQuery(transferId);
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load transfer.',
  });

  return {
    pageHeader: transferPageHeaders.details,
    detailsQuery: query,
    transferId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => { if (transferId !== null) navigate(PRODUCT_MANAGER_ROUTES.transfers.edit(transferId)); },
    handleBack: () => navigate(PRODUCT_MANAGER_ROUTES.transfers.list),
  };
};
