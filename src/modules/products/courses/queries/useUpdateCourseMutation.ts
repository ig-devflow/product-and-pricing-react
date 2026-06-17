import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCourse } from '@/modules/products/courses/api/courses.api';
import type { UpdateCourseRequestDto } from '@/modules/products/courses/api/dto';
import { courseQueryKeys } from '@/modules/products/courses/model/query-keys';

export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCourseRequestDto }) =>
      updateCourse(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: courseQueryKeys.all });
    },
  });
};
