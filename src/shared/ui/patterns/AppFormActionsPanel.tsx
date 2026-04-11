import type { ReactNode } from 'react';
import { AppButton } from '@/shared/ui/primitives';
import { AppSurface } from '@/shared/ui/primitives';

export interface AppFormActionsPanelProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  submitLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
}

export const AppFormActionsPanel = ({
  title = '',
  description = '',
  children,
  submitLabel = 'Save changes',
  isSubmitting = false,
  onCancel,
  cancelLabel = 'Cancel',
}: AppFormActionsPanelProps) => (
  <AppSurface className="app-form-actions-panel" variant="soft" padding="md">
    <div className="app-form-actions-panel__copy">
      {title ? <h2 className="app-form-actions-panel__title">{title}</h2> : null}
      {description ? (
        <p className="app-form-actions-panel__text">{description}</p>
      ) : null}
    </div>
    <div className="app-form-actions-panel__actions">
      {children ?? (
        <>
          <AppButton type="submit" loading={isSubmitting}>
            {submitLabel}
          </AppButton>
          {onCancel ? (
            <AppButton type="button" variant="secondary" onClick={onCancel}>
              {cancelLabel}
            </AppButton>
          ) : null}
        </>
      )}
    </div>
  </AppSurface>
);
