import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export type AppTextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  ({ className, ...rest }, ref) => (
    <textarea ref={ref} className={cn('app-textarea', className)} {...rest} />
  ),
);

AppTextarea.displayName = 'AppTextarea';
