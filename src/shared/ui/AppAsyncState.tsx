import { AppButton, AppSurface } from '@/shared/ui/primitives';

export interface AppAsyncStateProps {
  title: string;
  text?: string;
  actionText?: string;
  surfaceVariant?: 'soft' | 'outlined';
  onAction?: () => void;
}

export const AppAsyncState = ({
  title,
  text = '',
  actionText = '',
  surfaceVariant = 'soft',
  onAction,
}: AppAsyncStateProps) => (
  <AppSurface className="app-async-state" variant={surfaceVariant} padding="lg">
    <div className="app-stack app-stack--sm">
      <h2 className="app-async-state__title">{title}</h2>
      {text ? <p className="app-async-state__text">{text}</p> : null}
    </div>

    {actionText ? (
      <AppButton type="button" variant="secondary" onClick={onAction}>
        {actionText}
      </AppButton>
    ) : null}
  </AppSurface>
);
