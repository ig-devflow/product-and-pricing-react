import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const AppSwitch = forwardRef<HTMLInputElement, AppSwitchProps>(
  ({ className, label, id, ...rest }, ref) => {
    const switchId = id ?? rest.name;

    return (
      <label className={cn('app-switch', className)} htmlFor={switchId}>
        <input
          ref={ref}
          id={switchId}
          className="app-switch__input"
          type="checkbox"
          {...rest}
        />
        <span className="app-switch__track" aria-hidden="true">
          <span className="app-switch__thumb" />
        </span>
        {label ? <span className="app-switch__label">{label}</span> : null}
      </label>
    );
  },
);

AppSwitch.displayName = 'AppSwitch';
