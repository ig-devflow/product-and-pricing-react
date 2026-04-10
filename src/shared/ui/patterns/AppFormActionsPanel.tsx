import { AppButton } from '@/shared/ui/primitives';

export interface AppFormActionsPanelProps {
  submitLabel: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
}

export const AppFormActionsPanel = ({
  submitLabel,
  isSubmitting = false,
  onCancel,
  cancelLabel = 'Cancel',
}: AppFormActionsPanelProps) => (
  <div className="app-form-actions-panel">
    <AppButton type="submit" loading={isSubmitting}>
      {submitLabel}
    </AppButton>
    {onCancel ? (
      <AppButton type="button" variant="secondary" onClick={onCancel}>
        {cancelLabel}
      </AppButton>
    ) : null}
  </div>
);
