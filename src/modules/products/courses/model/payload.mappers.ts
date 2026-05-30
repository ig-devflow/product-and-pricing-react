import type { CreateCourseRequestDto, UpdateCourseRequestDto } from '@/modules/products/courses/api/dto';
import type { CourseFormValues } from './form.types';

function toOptionalInt(value: number | ''): number | null {
  return typeof value === 'number' ? value : null;
}

export function mapCourseFormValuesToCreateDto(values: CourseFormValues): CreateCourseRequestDto {
  return {
    name: values.name.trim(),
    unitTypeId: values.unitTypeId ?? 0,
    courseLanguageId: values.courseLanguageId ?? 0,
    courseIntensityId: values.courseIntensityId ?? 0,
    isActive: values.isActive,
    accountCategoryId: values.accountCategoryId ?? 0,
    productCategoryId: values.productCategoryId ?? 0,
    ageFrom: toOptionalInt(values.ageFrom),
    ageTo: toOptionalInt(values.ageTo),
    minimumWeeks: toOptionalInt(values.minimumWeeks),
    generalLedgerCode: values.generalLedgerCode.trim() || null,
    costCentreCode: values.costCentreCode.trim() || null,
    closurePolicy: values.closurePolicy || null,
  };
}

export function mapCourseFormValuesToUpdateDto(
  values: CourseFormValues,
  version: string,
): UpdateCourseRequestDto {
  return { ...mapCourseFormValuesToCreateDto(values), version };
}
