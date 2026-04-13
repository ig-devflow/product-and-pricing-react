import { AppFormActionsPanel } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';

export interface DivisionFormActionsProps {
  mode: 'create' | 'edit';
  submitLabel?: string;
  isSubmitting?: boolean;
  canReset?: boolean;
  onCancel: () => void;
  onReset: () => void;
}

export const DivisionFormActions = ({
  mode,
  submitLabel,
  isSubmitting = false,
  canReset = false,
  onCancel,
  onReset,
}: DivisionFormActionsProps) => {
  const resolvedSubmitLabel =
    submitLabel ?? (mode === 'create' ? 'Create division' : 'Save changes');
  const title =
    mode === 'create'
      ? 'Ready to create this division?'
      : 'Ready to save your changes?';
  const description =
    'Review the current values before saving them to the backend.';

  return (
    <AppFormActionsPanel title={title} description={description}>
      <AppButton
        type="button"
        variant="ghost"
        disabled={isSubmitting}
        onClick={onCancel}
      >
        Cancel
      </AppButton>

      {canReset ? (
        <AppButton
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={onReset}
        >
          Reset changes
        </AppButton>
      ) : null}

      <AppButton
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : resolvedSubmitLabel}
      </AppButton>
    </AppFormActionsPanel>
  );
};
