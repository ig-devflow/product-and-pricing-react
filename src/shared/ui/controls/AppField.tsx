import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const AppField = ({
  id,
  label,
  required = false,
  hint,
  error,
  children,
  className,
}: AppFieldProps) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('app-field', className)}>
      <label className="app-field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className="app-field__control">{children}</div>
      {hint ? (
        <p className="app-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="app-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};
