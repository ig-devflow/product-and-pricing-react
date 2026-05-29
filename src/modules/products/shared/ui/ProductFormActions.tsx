import { AppFormActionsPanel } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';

export interface ProductFormActionsProps {
  mode: 'create' | 'edit';
  entityLabel: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  canReset?: boolean;
  onCancel: () => void;
  onReset: () => void;
}

export const ProductFormActions = ({
  mode,
  entityLabel,
  submitLabel,
  isSubmitting = false,
  canReset = false,
  onCancel,
  onReset,
}: ProductFormActionsProps) => {
  const resolvedLabel = submitLabel ?? (mode === 'create' ? `Create ${entityLabel}` : 'Save changes');
  const title =
    mode === 'create'
      ? `Ready to create this ${entityLabel}?`
      : 'Ready to save your changes?';

  return (
    <AppFormActionsPanel title={title} description="Review the current values before saving.">
      <AppButton type="button" variant="ghost" disabled={isSubmitting} onClick={onCancel}>
        Cancel
      </AppButton>
      {canReset ? (
        <AppButton type="button" variant="secondary" disabled={isSubmitting} onClick={onReset}>
          Reset changes
        </AppButton>
      ) : null}
      <AppButton type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : resolvedLabel}
      </AppButton>
    </AppFormActionsPanel>
  );
};
