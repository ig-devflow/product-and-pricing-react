import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { packagePageHeaders } from '../config/pageHeaders';
import { usePackageDetailsQuery } from '../queries/usePackageDetailsQuery';
import { usePackageRouteId } from './usePackageRouteId';

export const usePackageDetailsScreen = () => {
  const navigate = useNavigate();
  const packageId = usePackageRouteId();
  const query = usePackageDetailsQuery(packageId);
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load package.',
  });

  return {
    pageHeader: packagePageHeaders.details,
    detailsQuery: query,
    packageId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => { if (packageId !== null) navigate(PRODUCT_MANAGER_ROUTES.packages.edit(packageId)); },
    handleBack: () => navigate(PRODUCT_MANAGER_ROUTES.packages.list),
  };
};
