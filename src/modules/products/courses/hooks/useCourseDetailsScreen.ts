import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { coursePageHeaders } from '../config/pageHeaders';
import { useCourseDetailsQuery } from '../queries/useCourseDetailsQuery';
import { useCourseRouteId } from './useCourseRouteId';

export const useCourseDetailsScreen = () => {
  const navigate = useNavigate();
  const courseId = useCourseRouteId();
  const courseQuery = useCourseDetailsQuery(courseId);
  const pageState = buildResourcePageState({
    data: courseQuery.data,
    isLoading: courseQuery.isLoading,
    error: courseQuery.error,
    fallbackErrorMessage: 'Failed to load course.',
  });

  return {
    pageHeader: coursePageHeaders.details,
    detailsQuery: courseQuery,
    courseId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => { if (courseId !== null) navigate(PRODUCT_MANAGER_ROUTES.courses.edit(courseId)); },
    handleBack: () => navigate(PRODUCT_MANAGER_ROUTES.courses.list),
  };
};
