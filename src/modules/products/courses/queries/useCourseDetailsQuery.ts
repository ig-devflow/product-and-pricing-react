import { useQuery } from '@tanstack/react-query';
import { getCourseById } from '@/modules/products/courses/api/courses.api';
import { mapCourseDetailsDto } from '@/modules/products/courses/model/mappers';
import { courseQueryKeys } from '@/modules/products/courses/model/query-keys';

export const useCourseDetailsQuery = (id: number | null) =>
  useQuery({
    queryKey: courseQueryKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) throw new Error('Course ID is required');
      return mapCourseDetailsDto(await getCourseById(id));
    },
    enabled: Boolean(id),
  });
