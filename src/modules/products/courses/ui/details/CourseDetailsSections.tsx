import { AppKeyValueList } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { CourseDetails } from '@/modules/products/courses/model/types';

export interface CourseDetailsSectionsProps {
  course: CourseDetails;
}

export const CourseDetailsSections = ({ course }: CourseDetailsSectionsProps) => (
  <div className="app-stack app-stack--lg">
    <AppSectionCard title="Schedule" description="Lesson schedule for this course.">
      <div className="product-details-sections__grid">
        <AppKeyValueList>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Lessons per week</dt>
            <dd className="app-key-value-list__value">{course.lessonsPerWeek}</dd>
          </div>
        </AppKeyValueList>
        <AppKeyValueList>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Minutes per lesson</dt>
            <dd className="app-key-value-list__value">{course.minutesPerLesson}</dd>
          </div>
        </AppKeyValueList>
        <AppKeyValueList>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Age range</dt>
            <dd className="app-key-value-list__value">{course.minAge}–{course.maxAge} years</dd>
          </div>
        </AppKeyValueList>
        <AppKeyValueList>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Division</dt>
            <dd className="app-key-value-list__value">{course.divisionName || 'Not set'}</dd>
          </div>
        </AppKeyValueList>
      </div>
    </AppSectionCard>

    {course.description ? (
      <AppSectionCard title="Description">
        <p className="product-details-sections__copy">{course.description}</p>
      </AppSectionCard>
    ) : null}
  </div>
);
