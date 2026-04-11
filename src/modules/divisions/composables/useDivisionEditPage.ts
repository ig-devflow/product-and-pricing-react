import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { createDivisionFormDefaults } from '@/modules/divisions/model/factory';
import {
  mapDivisionDetailsToFormValues,
  mapDivisionFormValuesToPayload,
} from '@/modules/divisions/model/mappers';
import { useDivisionRouteId } from './useDivisionRouteId';
import { useDivisionDetailsQuery } from '@/modules/divisions/queries/useDivisionDetailsQuery';
import { useUpdateDivisionMutation } from '@/modules/divisions/queries/useUpdateDivisionMutation';

export const useDivisionEditPage = () => {
  const navigate = useNavigate();
  const divisionId = useDivisionRouteId();
  const divisionQuery = useDivisionDetailsQuery(divisionId);
  const updateMutation = useUpdateDivisionMutation();

  const defaultValues = useMemo(
    () => (divisionQuery.data ? mapDivisionDetailsToFormValues(divisionQuery.data) : createDivisionFormDefaults()),
    [divisionQuery.data],
  );

  const onSubmit = async (values: DivisionFormValues) => {
    if (divisionId === null) {
      return;
    }

    const payload = mapDivisionFormValuesToPayload(values);
    await updateMutation.mutateAsync({ divisionId, payload });
    navigate(DIVISION_MANAGER_ROUTES.details(divisionId));
  };

  return {
    title: 'Edit division',
    submitLabel: 'Save changes',
    divisionId,
    division: divisionQuery.data ?? null,
    defaultValues,
    isLoading: divisionQuery.isLoading,
    isSubmitting: updateMutation.isPending,
    isError: divisionQuery.isError,
    errorMessage:
      (divisionQuery.error instanceof Error && divisionQuery.error.message) ||
      (updateMutation.error instanceof Error && updateMutation.error.message) ||
      null,
    onSubmit,
    onCancel: () => {
      if (divisionId !== null) {
        navigate(DIVISION_MANAGER_ROUTES.details(divisionId));
      } else {
        navigate(DIVISION_MANAGER_ROUTES.list);
      }
    },
  };
};
