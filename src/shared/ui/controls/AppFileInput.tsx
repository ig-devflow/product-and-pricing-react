import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppFileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  triggerLabel?: string;
}

export const AppFileInput = forwardRef<HTMLInputElement, AppFileInputProps>(
  ({ className, id, triggerLabel = 'Choose file', ...rest }, ref) => {
    const fallbackId = useId();
    const inputId = id ?? fallbackId;

    return (
      <div className={cn('app-file-input', className)}>
        <input
          ref={ref}
          id={inputId}
          className="app-file-input__control"
          type="file"
          {...rest}
        />
        <label className="app-file-input__trigger" htmlFor={inputId}>
          {triggerLabel}
        </label>
      </div>
    );
  },
);

AppFileInput.displayName = 'AppFileInput';
