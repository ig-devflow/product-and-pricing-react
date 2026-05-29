import type { CourseDetails } from './types';
import type { CourseFormValues } from './form.types';

export function createEmptyCourseFormValues(): CourseFormValues {
  return {
    name: '',
    unitTypeId: null,
    courseLanguageId: null,
    courseIntensityId: null,
    isActive: true,
    accountCategoryId: null,
    productCategoryId: null,
    ageFrom: '',
    ageTo: '',
    minimumWeeks: '',
    generalLedgerCode: '',
    costCentreCode: '',
    closurePolicy: '',
  };
}

export function mapCourseDetailsToFormValues(details: CourseDetails): CourseFormValues {
  return {
    name: details.name,
    unitTypeId: details.unitTypeId,
    courseLanguageId: details.courseLanguageId,
    courseIntensityId: details.courseIntensityId,
    isActive: details.isActive,
    accountCategoryId: details.accountCategoryId,
    productCategoryId: details.productCategoryId,
    ageFrom: details.ageFrom ?? '',
    ageTo: details.ageTo ?? '',
    minimumWeeks: details.minimumWeeks ?? '',
    generalLedgerCode: details.generalLedgerCode,
    costCentreCode: details.costCentreCode,
    closurePolicy: details.closurePolicy,
  };
}
