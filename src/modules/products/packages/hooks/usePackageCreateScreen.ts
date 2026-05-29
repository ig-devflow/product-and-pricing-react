import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { PackageFormValues } from '../model/form.types';
import { createEmptyPackageFormValues, mapPackageFormValuesToCreateDto } from '../model/mappers';
import { useCreatePackageMutation } from '../queries/useCreatePackageMutation';
import { packagePageHeaders } from '../config/pageHeaders';

export const usePackageCreateScreen = () => {
  const navigate = useNavigate();
  const createMutation = useCreatePackageMutation();
  const initialValues = useMemo(() => createEmptyPackageFormValues(), []);

  return {
    pageHeader: packagePageHeaders.create,
    initialValues,
    submitLabel: 'Create package',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save package.'),
    handleSubmit: async (values: PackageFormValues) => {
      const result = await createMutation.mutateAsync(mapPackageFormValuesToCreateDto(values));
      navigate(PRODUCT_MANAGER_ROUTES.packages.details(result.id));
    },
    handleCancel: () => navigate(PRODUCT_MANAGER_ROUTES.packages.list),
  };
};
