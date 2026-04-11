import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppFieldRenderProps {
  controlId: string;
  ariaDescribedby?: string;
  ariaLabelledby: string;
  describedBy?: string;
  labelId: string;
  hintId: string;
  errorId: string;
}

export interface AppFieldProps {
  id?: string;
  forId?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode | ((props: AppFieldRenderProps) => ReactNode);
  className?: string;
}

export const AppField = ({
  id,
  forId,
  label = '',
  required = false,
  hint,
  error,
  children,
  className,
}: AppFieldProps) => {
  const fallbackId = useId();
  const fieldId = forId ?? id ?? fallbackId;
  const labelId = `${fieldId}-label`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const renderProps: AppFieldRenderProps = {
    controlId: fieldId,
    ariaDescribedby: describedBy,
    ariaLabelledby: labelId,
    describedBy,
    labelId,
    hintId,
    errorId,
  };

  let content: ReactNode;

  if (typeof children === 'function') {
    content = children(renderProps);
  } else if (isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props;

    content = cloneElement(child, {
      id: (childProps.id as string | undefined) ?? fieldId,
      'aria-describedby':
        (childProps['aria-describedby'] as string | undefined) ?? describedBy,
      'aria-labelledby':
        (childProps['aria-labelledby'] as string | undefined) ?? labelId,
    });
  } else {
    content = children;
  }

  return (
    <div className={cn('app-field', { 'app-field--invalid': Boolean(error) }, className)}>
      {label ? (
        <label id={labelId} className="app-label" htmlFor={fieldId}>
          <span>{label}</span>
          {required ? (
            <span className="app-label__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="app-field__control">{content}</div>
      {error ? (
        <p className="app-field__error" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="app-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};
