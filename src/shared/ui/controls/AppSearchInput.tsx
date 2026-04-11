import { forwardRef, type InputHTMLAttributes } from 'react';
import { AppInput } from '@/shared/ui/primitives';
import { cn } from '@/shared/lib/cn';

export type AppSearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
>;

export const AppSearchInput = forwardRef<HTMLInputElement, AppSearchInputProps>(
  ({ className, ...rest }, ref) => (
    <div className={cn('app-search-input', className)}>
      <span className="app-search-input__icon" aria-hidden="true">
        search
      </span>
      <AppInput ref={ref} type="search" {...rest} />
    </div>
  ),
);

AppSearchInput.displayName = 'AppSearchInput';
