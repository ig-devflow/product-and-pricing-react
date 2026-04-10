import * as Select from '@radix-ui/react-select';
import type { KeyboardEvent } from 'react';

export interface AppSelectOption {
  label: string;
  value: string;
}

export interface AppSelectProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: AppSelectOption[];
  name?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export const AppSelect = ({
  id,
  value,
  defaultValue,
  placeholder = 'Select value',
  options,
  name,
  disabled,
  onValueChange,
}: AppSelectProps) => {
  const currentValue = value ?? defaultValue ?? options[0]?.value;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!onValueChange || options.length === 0) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const currentIndex = options.findIndex((option) => option.value === currentValue);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex =
      event.key === 'ArrowDown'
        ? Math.min(options.length - 1, safeIndex + 1)
        : Math.max(0, safeIndex - 1);

    onValueChange(options[nextIndex]!.value);
  };

  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      disabled={disabled}
    >
      <Select.Trigger
        id={id}
        className="app-select-trigger"
        aria-label={name}
        onKeyDown={handleKeyDown}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="app-select-trigger__icon" aria-hidden="true">
          v
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="app-select-content" position="popper" sideOffset={6}>
          <Select.Viewport className="app-select-viewport">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                className="app-select-item"
                value={option.value}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
