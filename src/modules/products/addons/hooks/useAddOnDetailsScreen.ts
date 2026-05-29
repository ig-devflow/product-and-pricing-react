import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { addonPageHeaders } from '../config/pageHeaders';
import { useAddOnDetailsQuery } from '../queries/useAddOnDetailsQuery';
import { useAddOnRouteId } from './useAddOnRouteId';

export const useAddOnDetailsScreen = () => {
  const navigate = useNavigate();
  const addonId = useAddOnRouteId();
  const query = useAddOnDetailsQuery(addonId);
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load add-on.',
  });

  return {
    pageHeader: addonPageHeaders.details,
    detailsQuery: query,
    addonId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => { if (addonId !== null) navigate(PRODUCT_MANAGER_ROUTES.addons.edit(addonId)); },
    handleBack: () => navigate(PRODUCT_MANAGER_ROUTES.addons.list),
  };
};
