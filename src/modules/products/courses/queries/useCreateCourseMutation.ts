import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse } from '@/modules/products/courses/api/courses.api';
import type { CreateCourseRequestDto } from '@/modules/products/courses/api/dto';
import { courseQueryKeys } from '@/modules/products/courses/model/query-keys';

export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      divisionId,
      payload,
    }: {
      divisionId: number;
      payload: CreateCourseRequestDto;
    }) => createCourse(divisionId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: courseQueryKeys.lists() });
    },
  });
};
