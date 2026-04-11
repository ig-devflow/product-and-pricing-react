import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';
type AppButtonSize = 'md' | 'sm';

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn('app-button', `app-button--${variant}`, `app-button--${size}`, className)}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  ),
);

AppButton.displayName = 'AppButton';
