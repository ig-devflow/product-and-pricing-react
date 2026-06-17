import { httpClient } from '@/shared/api/http/http-client';
import type {
  CourseDetailsDto,
  CourseListItemDto,
  CreateCourseRequestDto,
  CreateCourseResponseDto,
  PagedResultDto,
  UpdateCourseRequestDto,
} from './dto';
import type { GetCoursesParams } from '../model/query-keys';

export async function getCourses(
  divisionId: number,
  params: GetCoursesParams = {},
): Promise<PagedResultDto<CourseListItemDto>> {
  return httpClient.get<PagedResultDto<CourseListItemDto>>(
    `/api/v1/divisions/${divisionId}/courses`,
    { ...params },
  );
}

export async function getCourseById(id: number): Promise<CourseDetailsDto> {
  return httpClient.get<CourseDetailsDto>(`/api/v1/courses/${id}`);
}

export async function createCourse(
  divisionId: number,
  payload: CreateCourseRequestDto,
): Promise<CreateCourseResponseDto> {
  return httpClient.post<CreateCourseResponseDto, CreateCourseRequestDto>(
    `/api/v1/divisions/${divisionId}/courses`,
    payload,
  );
}

export async function updateCourse(id: number, payload: UpdateCourseRequestDto): Promise<void> {
  await httpClient.put<null, UpdateCourseRequestDto>(`/api/v1/courses/${id}`, payload);
}
