import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import type { CourseFormValues } from '../model/form.types';
import {
  createEmptyCourseFormValues,
  mapCourseDetailsToFormValues,
  mapCourseFormValuesToUpdateDto,
} from '../model/mappers';
import { useCourseDetailsQuery } from '../queries/useCourseDetailsQuery';
import { useUpdateCourseMutation } from '../queries/useUpdateCourseMutation';
import { coursePageHeaders } from '../config/pageHeaders';
import { useCourseRouteId } from './useCourseRouteId';

export const useCourseEditScreen = () => {
  const navigate = useNavigate();
  const { divisionId, divisionName } = useDivisionContext();
  const courseId = useCourseRouteId();
  const courseQuery = useCourseDetailsQuery(courseId);
  const updateMutation = useUpdateCourseMutation();
  const pageState = buildResourcePageState({
    data: courseQuery.data,
    isLoading: courseQuery.isLoading,
    error: courseQuery.error,
    fallbackErrorMessage: 'Failed to load course.',
  });

  const defaultValues = useMemo(
    () => pageState.data ? mapCourseDetailsToFormValues(pageState.data) : createEmptyCourseFormValues(),
    [pageState.data],
  );

  return {
    pageHeader: coursePageHeaders.edit,
    submitLabel: 'Save changes',
    courseId,
    details: pageState.data,
    detailsQuery: courseQuery,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveErrorMessage: getApiErrorMessage(updateMutation.error, 'Failed to save course.'),
    initialValues: defaultValues,
    divisionId,
    divisionName,
    onSubmit: async (values: CourseFormValues) => {
      if (courseId === null || !pageState.data) return;
      await updateMutation.mutateAsync({
        id: courseId,
        payload: mapCourseFormValuesToUpdateDto(values, pageState.data.version),
      });
      navigate(PRODUCT_MANAGER_ROUTES.courses.details(courseId));
    },
    onCancel: () => {
      if (courseId !== null) navigate(PRODUCT_MANAGER_ROUTES.courses.details(courseId));
      else navigate(PRODUCT_MANAGER_ROUTES.courses.list);
    },
  };
};
