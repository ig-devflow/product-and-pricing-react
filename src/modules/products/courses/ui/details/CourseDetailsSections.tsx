import { AppKeyValueList } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { CourseDetails } from '@/modules/products/courses/model/types';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { useCourseLanguagesQuery } from '@/shared/queries/useCourseLanguagesQuery';
import { useCourseIntensitiesQuery } from '@/shared/queries/useCourseIntensitiesQuery';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';
import { useAccountCategoriesQuery } from '@/shared/queries/useAccountCategoriesQuery';
import { useProductCategoriesQuery } from '@/shared/queries/useProductCategoriesQuery';

function findName(items: { id: number; name: string }[] | undefined, id: number | null | undefined): string {
  if (!items || id == null) return '—';
  return items.find((x) => x.id === id)?.name ?? String(id);
}

export interface CourseDetailsSectionsProps {
  course: CourseDetails;
}

export const CourseDetailsSections = ({ course }: CourseDetailsSectionsProps) => {
  const { divisionName, divisionId } = useDivisionContext();
  const languagesQuery = useCourseLanguagesQuery();
  const intensitiesQuery = useCourseIntensitiesQuery();
  const unitTypesQuery = useUnitTypesQuery();
  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);

  const languageName = findName(languagesQuery.data, course.courseLanguageId);
  const intensityName = findName(intensitiesQuery.data, course.courseIntensityId);
  const unitTypeName = findName(unitTypesQuery.data, course.unitTypeId);
  const accountCatName = findName(accountCatsQuery.data, course.accountCategoryId);
  const productCatName = findName(productCatsQuery.data, course.productCategoryId);

  return (
    <div className="app-stack app-stack--lg">
      <AppSectionCard title="Basics" description="Name and current availability status.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Division</dt>
              <dd className="app-key-value-list__value">{divisionName}</dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      <AppSectionCard title="Classification" description="Language, intensity, and pricing.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Language</dt>
              <dd className="app-key-value-list__value">{languageName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Intensity</dt>
              <dd className="app-key-value-list__value">{intensityName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Priced per</dt>
              <dd className="app-key-value-list__value">{unitTypeName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Minimum weeks</dt>
              <dd className="app-key-value-list__value">{course.minimumWeeks ?? '—'}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Age range</dt>
              <dd className="app-key-value-list__value">
                {course.ageFrom != null && course.ageTo != null
                  ? `${course.ageFrom}–${course.ageTo}`
                  : course.ageFrom != null
                    ? `${course.ageFrom}+`
                    : '—'}
              </dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      <AppSectionCard title="Categorisation" description="Categories and student age range.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Product category</dt>
              <dd className="app-key-value-list__value">{productCatName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Account category</dt>
              <dd className="app-key-value-list__value">{accountCatName}</dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      {(course.generalLedgerCode || course.costCentreCode || course.closurePolicy) ? (
        <AppSectionCard title="Finance & availability">
          <div className="product-details-sections__grid">
            {course.generalLedgerCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">GL code</dt>
                  <dd className="app-key-value-list__value">{course.generalLedgerCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {course.costCentreCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Cost centre</dt>
                  <dd className="app-key-value-list__value">{course.costCentreCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {course.closurePolicy ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Closure date</dt>
                  <dd className="app-key-value-list__value">
                    {new Date(course.closurePolicy).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </dd>
                </div>
              </AppKeyValueList>
            ) : null}
          </div>
        </AppSectionCard>
      ) : null}
    </div>
  );
};
