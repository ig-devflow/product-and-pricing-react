import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import type { PackageFormValues } from '../model/form.types';
import {
  createEmptyPackageFormValues,
  mapPackageDetailsToFormValues,
  mapPackageFormValuesToUpdateDto,
} from '../model/mappers';
import { usePackageDetailsQuery } from '../queries/usePackageDetailsQuery';
import { useUpdatePackageMutation } from '../queries/useUpdatePackageMutation';
import { packagePageHeaders } from '../config/pageHeaders';
import { usePackageRouteId } from './usePackageRouteId';

export const usePackageEditScreen = () => {
  const navigate = useNavigate();
  const { divisionId, divisionName } = useDivisionContext();
  const packageId = usePackageRouteId();
  const query = usePackageDetailsQuery(packageId);
  const updateMutation = useUpdatePackageMutation();
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load package.',
  });

  const defaultValues = useMemo(
    () => pageState.data ? mapPackageDetailsToFormValues(pageState.data) : createEmptyPackageFormValues(),
    [pageState.data],
  );

  return {
    pageHeader: packagePageHeaders.edit,
    submitLabel: 'Save changes',
    packageId,
    divisionId,
    divisionName,
    details: pageState.data,
    detailsQuery: query,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveErrorMessage: getApiErrorMessage(updateMutation.error, 'Failed to save package.'),
    initialValues: defaultValues,
    onSubmit: async (values: PackageFormValues) => {
      if (packageId === null || !pageState.data) return;
      await updateMutation.mutateAsync({
        id: packageId,
        payload: mapPackageFormValuesToUpdateDto(values, pageState.data.version),
      });
      navigate(PRODUCT_MANAGER_ROUTES.packages.details(packageId));
    },
    onCancel: () => {
      if (packageId !== null) navigate(PRODUCT_MANAGER_ROUTES.packages.details(packageId));
      else navigate(PRODUCT_MANAGER_ROUTES.packages.list);
    },
  };
};
