import type { ReactNode } from 'react';
import { AppSurface } from '@/shared/ui/primitives';

export interface AppFormActionsPanelProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export const AppFormActionsPanel = ({
  title = '',
  description = '',
  children,
}: AppFormActionsPanelProps) => (
  <AppSurface className="app-form-actions-panel" variant="soft" padding="md">
    <div className="app-form-actions-panel__copy">
      {title ? <h2 className="app-form-actions-panel__title">{title}</h2> : null}
      {description ? (
        <p className="app-form-actions-panel__text">{description}</p>
      ) : null}
    </div>
    <div className="app-form-actions-panel__actions">
      {children}
    </div>
  </AppSurface>
);
