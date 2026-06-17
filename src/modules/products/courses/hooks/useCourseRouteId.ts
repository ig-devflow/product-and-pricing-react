import { useParams } from 'react-router';

export const useCourseRouteId = (): number | null => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) return null;
  const parsed = Number(courseId);
  return Number.isNaN(parsed) ? null : parsed;
};
