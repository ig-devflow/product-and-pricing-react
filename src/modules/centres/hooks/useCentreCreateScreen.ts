import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { CENTRE_MANAGER_ROUTES } from '@/app/config/routes';
import { centrePageHeaders } from '@/modules/centres/config/pageHeaders';
import { createEmptyCentreFormValues } from '@/modules/centres/model/form.mappers';
import { mapFormValuesToCreateDto } from '@/modules/centres/model/payload.mappers';
import { useCreateCentreMutation } from '@/modules/centres/queries/useCreateCentreMutation';
import type { CentreFormValues } from '@/modules/centres/model/form.types';

export const useCentreCreateScreen = () => {
  const navigate = useNavigate();
  const pageHeader = centrePageHeaders.create;
  const createMutation = useCreateCentreMutation();
  const initialValues = useMemo(() => createEmptyCentreFormValues(), []);

  const handleSubmit = async (values: CentreFormValues) => {
    const response = await createMutation.mutateAsync(mapFormValuesToCreateDto(values));
    navigate(CENTRE_MANAGER_ROUTES.details(response.id));
  };

  const handleCancel = () => navigate(CENTRE_MANAGER_ROUTES.list);

  return {
    pageHeader,
    initialValues,
    isSaving: createMutation.isPending,
    saveError: createMutation.error,
    handleSubmit,
    handleCancel,
  };
};
