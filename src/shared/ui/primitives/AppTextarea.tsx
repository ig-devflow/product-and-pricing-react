import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  describedBy?: string;
  labelledBy?: string;
}

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  ({ className, invalid = false, describedBy, labelledBy, ...rest }, ref) => (
    <textarea
      ref={ref}
      className={cn('app-textarea', { 'app-textarea--invalid': invalid }, className)}
      aria-invalid={invalid ? 'true' : undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      {...rest}
    />
  ),
);

AppTextarea.displayName = 'AppTextarea';
