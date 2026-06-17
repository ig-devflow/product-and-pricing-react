import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSurface } from '@/shared/ui/primitives';
import type { CourseFormValues } from '@/modules/products/courses/model/form.types';
import { courseFormSchema } from './schema';
import {
  BasicsSection,
  ClassificationSection,
  CategorisationSection,
  FinanceSection,
} from './sections';

const SECTIONS = [
  { id: 'section-basics', label: 'Basics' },
  { id: 'section-classification', label: 'Classification' },
  { id: 'section-categorisation', label: 'Categorisation' },
  { id: 'section-finance', label: 'Finance & availability' },
];

export interface CourseFormProps {
  id?: string;
  mode?: 'create' | 'edit';
  defaultValues: CourseFormValues;
  errorMessage?: string | null;
  divisionId: number;
  divisionName: string;
  onSubmit: (values: CourseFormValues) => Promise<void> | void;
}

export const CourseForm = ({
  id = 'course-form',
  mode = 'create',
  defaultValues,
  errorMessage,
  divisionId,
  divisionName,
  onSubmit,
}: CourseFormProps) => {
  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const resetKey = useMemo(() => (mode === 'edit' ? 'edit' : 'create'), [mode]);
  const defaultValuesRef = useRef(defaultValues);
  useEffect(() => { defaultValuesRef.current = defaultValues; }, [defaultValues]);
  useEffect(() => { methods.reset(defaultValuesRef.current); }, [methods, resetKey]);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className="product-form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="product-form__body">
          <div className="product-form__sections">
            <BasicsSection divisionName={divisionName} />
            <ClassificationSection />
            <CategorisationSection divisionId={divisionId} />
            <FinanceSection />

            {errorMessage ? (
              <AppSurface className="product-form__error" padding="md">
                <h2 className="product-form__error-title">Save failed</h2>
                <p className="product-form__error-text">{errorMessage}</p>
              </AppSurface>
            ) : null}
          </div>

          <aside className="product-form__nav-sidebar">
            <nav className="product-form-section-nav" aria-label="Form sections">
              <p className="product-form-section-nav__label">Sections</p>
              <ul className="product-form-section-nav__list">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="product-form-section-nav__link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </form>
    </FormProvider>
  );
};
