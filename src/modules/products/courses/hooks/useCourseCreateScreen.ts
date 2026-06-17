import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { CourseFormValues } from '../model/form.types';
import { createEmptyCourseFormValues, mapCourseFormValuesToCreateDto } from '../model/mappers';
import { useCreateCourseMutation } from '../queries/useCreateCourseMutation';
import { coursePageHeaders } from '../config/pageHeaders';

export const useCourseCreateScreen = () => {
  const navigate = useNavigate();
  const { divisionId, divisionName } = useDivisionContext();
  const createMutation = useCreateCourseMutation();
  const initialValues = useMemo(() => createEmptyCourseFormValues(), []);

  return {
    pageHeader: coursePageHeaders.create,
    initialValues,
    submitLabel: 'Create course',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save course.'),
    divisionId,
    divisionName,
    handleSubmit: async (values: CourseFormValues) => {
      const result = await createMutation.mutateAsync({
        divisionId,
        payload: mapCourseFormValuesToCreateDto(values),
      });
      navigate(PRODUCT_MANAGER_ROUTES.courses.details(result.id));
    },
    handleCancel: () => navigate(PRODUCT_MANAGER_ROUTES.courses.list),
  };
};
