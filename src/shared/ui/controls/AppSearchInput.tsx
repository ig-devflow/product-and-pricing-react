import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';
import { AppInput } from '@/shared/ui/primitives';
import { cn } from '@/shared/lib/cn';

export type AppSearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const AppSearchInput = forwardRef<HTMLInputElement, AppSearchInputProps>(
  (
    {
      className,
      value,
      defaultValue = '',
      onValueChange,
      onChange,
      placeholder = 'Search...',
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const resolvedValue = isControlled ? value : internalValue;
    const hasValue = resolvedValue.trim().length > 0;

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }

      onValueChange?.(event.target.value);
      onChange?.(event);
    };

    const clear = () => {
      const element = inputRef.current;

      if (!element) {
        if (!isControlled) {
          setInternalValue('');
        }

        onValueChange?.('');
        return;
      }

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      )?.set;

      nativeInputValueSetter?.call(element, '');
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.focus();
    };

    return (
      <div className={cn('app-search-input', className)}>
        <span className="app-search-input__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <circle
              cx="9"
              cy="9"
              r="5.25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M12.8 12.8L16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </span>

        <AppInput
          ref={inputRef}
          type="text"
          value={resolvedValue}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
          {...rest}
        />

        {hasValue ? (
          <button
            type="button"
            className="app-search-input__clear"
            aria-label="Clear search"
            onClick={clear}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M6 6L14 14M14 6L6 14"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        ) : null}
      </div>
    );
  },
);

AppSearchInput.displayName = 'AppSearchInput';
