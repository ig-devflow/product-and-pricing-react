import type { WizardStepId } from '@/modules/centres/hooks/useCentreForm';
import { WIZARD_STEPS } from '@/modules/centres/hooks/useCentreForm';

export interface StepStatus {
  isCompleted: boolean;
  hasError: boolean;
}

export interface CentreStepperProps {
  currentStep: number;
  stepStatus: StepStatus[];
  onStepChange: (step: number) => void;
}

export const CentreStepper = ({ currentStep, stepStatus, onStepChange }: CentreStepperProps) => (
  <nav
    className="stepper"
    style={{ '--stepper-cols': WIZARD_STEPS.length } as React.CSSProperties}
    aria-label="Form steps"
  >
    {WIZARD_STEPS.map((step, i) => {
      const status = stepStatus[i];
      const isCurrent = i === currentStep;
      const className = [
        'stepper__step',
        isCurrent ? 'is-active' : '',
        status?.isCompleted ? 'is-done' : '',
        status?.hasError ? 'has-error' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <button
          key={step.id as WizardStepId}
          type="button"
          className={className}
          onClick={() => onStepChange(i)}
          aria-current={isCurrent ? 'step' : undefined}
        >
          <span className="stepper__badge">
            {status?.isCompleted ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 7 6 11 12 4" />
              </svg>
            ) : status?.hasError ? (
              '!'
            ) : (
              i + 1
            )}
          </span>
          <span className="stepper__copy">
            <span className="stepper__index">Step {i + 1}</span>
            <span className="stepper__label">{step.label}</span>
          </span>
        </button>
      );
    })}
  </nav>
);
