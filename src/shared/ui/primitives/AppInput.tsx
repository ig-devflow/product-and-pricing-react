import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  describedBy?: string;
  labelledBy?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, invalid = false, describedBy, labelledBy, ...rest }, ref) => (
    <input
      ref={ref}
      className={cn('app-input', { 'app-input--invalid': invalid }, className)}
      aria-invalid={invalid ? 'true' : undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      {...rest}
    />
  ),
);

AppInput.displayName = 'AppInput';
