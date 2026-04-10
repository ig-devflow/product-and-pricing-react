import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, ...rest }, ref) => (
    <input ref={ref} className={cn('app-input', className)} {...rest} />
  ),
);

AppInput.displayName = 'AppInput';
