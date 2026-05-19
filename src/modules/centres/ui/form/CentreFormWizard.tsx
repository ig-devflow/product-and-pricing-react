import { AppButton } from '@/shared/ui/primitives';
import type { CentreFormValues } from '@/modules/centres/model/form.types';
import { useCentreForm, WIZARD_STEPS } from '@/modules/centres/hooks/useCentreForm';
import { CentreStepper } from './CentreStepper';
import { CentreConflictBanner } from './CentreConflictBanner';
import { StepBasicInfo } from './steps/StepBasicInfo';
import { StepContactInfo } from './steps/StepContactInfo';
import { StepLegalRatios } from './steps/StepLegalRatios';
import { StepBankDetails } from './steps/StepBankDetails';
import { StepContactsTexts } from './steps/StepContactsTexts';

export interface CentreFormWizardProps {
  mode: 'create' | 'edit';
  initialValues: CentreFormValues;
  isSaving: boolean;
  onSubmit: (values: CentreFormValues) => Promise<void>;
  onCancel: () => void;
}

export const CentreFormWizard = ({
  mode,
  initialValues,
  isSaving,
  onSubmit,
  onCancel,
}: CentreFormWizardProps) => {
  const form = useCentreForm({ initialValues, onSubmit });

  const step1Props = {
    values: form.values.step1,
    onChange: (patch: Partial<CentreFormValues['step1']>) => form.setStepValues('step1', patch),
    errors: form.errors,
  };
  const step2Props = {
    values: form.values.step2,
    onChange: (patch: Partial<CentreFormValues['step2']>) => form.setStepValues('step2', patch),
    errors: form.errors,
  };
  const step3Props = {
    values: form.values.step3,
    onChange: (patch: Partial<CentreFormValues['step3']>) => form.setStepValues('step3', patch),
    errors: form.errors,
  };
  const step4Props = {
    values: form.values.step4,
    onChange: (patch: Partial<CentreFormValues['step4']>) => form.setStepValues('step4', patch),
    errors: form.errors,
  };
  const step5Props = {
    values: form.values.step5,
    onChange: (patch: Partial<CentreFormValues['step5']>) => form.setStepValues('step5', patch),
    errors: form.errors,
  };

  const isEdit = mode === 'edit';
  const submitLabel = isEdit ? 'Save changes' : 'Create centre';
  const maxVisitedStep = form.touchedSteps.size > 0 ? Math.max(...form.touchedSteps) : 0;

  return (
    <>
      <CentreStepper
        currentStep={form.step}
        stepStatus={form.stepStatus}
        onStepChange={form.goTo}
        mode={mode}
        maxVisitedStep={maxVisitedStep}
      />

      {form.hasConflict ? <CentreConflictBanner /> : null}

      <form className="centre-form" onSubmit={(e) => void form.handleSubmit(e)} noValidate>
        {form.step === 0 ? <StepBasicInfo {...step1Props} /> : null}
        {form.step === 1 ? <StepContactInfo {...step2Props} /> : null}
        {form.step === 2 ? <StepLegalRatios {...step3Props} /> : null}
        {form.step === 3 ? <StepBankDetails {...step4Props} /> : null}
        {form.step === 4 ? <StepContactsTexts {...step5Props} /> : null}

        <div className="centre-form__nav">
          <AppButton type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </AppButton>
          <div className="centre-form__nav-right">
            {!form.isFirstStep ? (
              <AppButton type="button" variant="ghost" onClick={form.onBack}>
                Back
              </AppButton>
            ) : null}
            {isEdit && form.isDirty && !form.isLastStep ? (
              <AppButton type="submit" variant="secondary" disabled={isSaving}>
                Save changes
              </AppButton>
            ) : null}
            {!form.isLastStep ? (
              <AppButton type="button" variant="primary" onClick={form.onNext}>
                Next: {WIZARD_STEPS[form.step + 1]?.label}
              </AppButton>
            ) : (
              <AppButton type="submit" variant="primary" disabled={isSaving}>
                {isSaving ? 'Saving...' : submitLabel}
              </AppButton>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
