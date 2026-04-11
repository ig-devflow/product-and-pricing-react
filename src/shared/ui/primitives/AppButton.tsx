import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'info';
type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
  block?: boolean;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      block = false,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        'app-button',
        `app-button--${variant}`,
        `app-button--${size}`,
        {
          'app-button--block': block,
        },
        className,
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading ? 'true' : undefined}
      {...rest}
    >
      {children}
    </button>
  ),
);

AppButton.displayName = 'AppButton';
