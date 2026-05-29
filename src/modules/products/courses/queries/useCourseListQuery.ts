import { useQuery } from '@tanstack/react-query';
import { getCourses } from '@/modules/products/courses/api/courses.api';
import { mapCourseListPageDto } from '@/modules/products/courses/model/mappers';
import { courseQueryKeys, type GetCoursesParams } from '@/modules/products/courses/model/query-keys';

export const useCourseListQuery = (divisionId: number, params: GetCoursesParams = {}) =>
  useQuery({
    queryKey: courseQueryKeys.list(divisionId, params),
    queryFn: async () => {
      const response = await getCourses(divisionId, params);
      return mapCourseListPageDto(response);
    },
    enabled: Boolean(divisionId),
  });
