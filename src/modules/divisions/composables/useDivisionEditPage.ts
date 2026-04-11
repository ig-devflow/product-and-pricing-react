import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useApiErrorMessage } from '@/shared/composables/useApiErrorMessage';
import { useResourcePageState } from '@/shared/composables/useResourcePageState';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import {
  createEmptyDivisionFormValues,
  mapDivisionDetailsToFormValues,
} from '@/modules/divisions/model/mappers';
import { useDivisionRouteId } from './useDivisionRouteId';
import { useDivisionDetailsQuery } from '@/modules/divisions/queries/useDivisionDetailsQuery';
import { useSaveDivisionMutation } from '@/modules/divisions/queries/useSaveDivisionMutation';
import { useDivisionPageHeader } from './useDivisionPageHeader';

export const useDivisionEditPage = () => {
  const navigate = useNavigate();
  const pageHeader = useDivisionPageHeader('edit');
  const divisionId = useDivisionRouteId();
  const divisionQuery = useDivisionDetailsQuery(divisionId);
  const saveMutation = useSaveDivisionMutation();
  const pageState = useResourcePageState({
    data: divisionQuery.data,
    isLoading: divisionQuery.isLoading,
    error: divisionQuery.error,
    fallbackErrorMessage: 'Failed to load division.',
  });
  const saveErrorMessage = useApiErrorMessage(
    saveMutation.error,
    'Failed to save division.',
  );

  const defaultValues = useMemo(
    () =>
      pageState.data
        ? mapDivisionDetailsToFormValues(pageState.data)
        : createEmptyDivisionFormValues(),
    [pageState.data],
  );

  const onSubmit = async (values: DivisionFormValues) => {
    if (divisionId === null) {
      return;
    }

    await saveMutation.mutateAsync({
      mode: 'edit',
      divisionId,
      values,
      existingReportTexts: pageState.data?.reportTexts ?? [],
    });
    navigate(DIVISION_MANAGER_ROUTES.details(divisionId));
  };

  return {
    pageHeader,
    submitLabel: 'Save changes',
    divisionId,
    details: pageState.data,
    detailsQuery: divisionQuery,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: saveMutation.isPending,
    saveErrorMessage,
    initialValues: defaultValues,
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
