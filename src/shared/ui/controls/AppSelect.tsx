import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { cn } from '@/shared/lib/cn';

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
  invalid?: boolean;
  describedBy?: string;
  labelledBy?: string;
  onValueChange?: (value: string) => void;
}

export const AppSelect = ({
  id,
  value,
  defaultValue,
  placeholder = 'Select value',
  options,
  name,
  disabled = false,
  invalid = false,
  describedBy,
  labelledBy,
  onValueChange,
}: AppSelectProps) => {
  const fallbackId = useId();
  const selectId = id ?? fallbackId;
  const listboxId = `${selectId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = value ?? internalValue;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === currentValue) ?? null,
    [currentValue, options],
  );

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === currentValue),
    [currentValue, options],
  );

  const activeDescendantId =
    isOpen && highlightedIndex >= 0
      ? `${selectId}-option-${highlightedIndex}`
      : undefined;

  const getOptionId = (index: number) => `${selectId}-option-${index}`;

  const open = () => {
    if (disabled) {
      return;
    }

    setIsOpen(true);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : options.length ? 0 : -1);
  };

  const close = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const toggle = () => {
    if (isOpen) {
      close();
      return;
    }

    open();
  };

  const selectOption = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    close();
  };

  const moveHighlight = (step: 1 | -1) => {
    if (!options.length) {
      return;
    }

    if (!isOpen) {
      open();
      return;
    }

    setHighlightedIndex((currentIndex) =>
      currentIndex < 0 ? 0 : (currentIndex + step + options.length) % options.length,
    );
  };

  const getHighlightedOption = () => options[highlightedIndex] ?? null;

  useEffect(() => {
    const handleDocumentPointerDown = (event: MouseEvent) => {
      const target = event.target;

      if (!rootRef.current || !(target instanceof Node)) {
        return;
      }

      if (!rootRef.current.contains(target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleDocumentPointerDown);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentPointerDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveHighlight(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveHighlight(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          open();
        } else {
          const option = getHighlightedOption();

          if (option) {
            selectOption(option.value);
          }
        }
        break;
      case 'Tab':
        close();
        break;
      case 'Escape':
        close();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn('app-select-shell', {
        'app-select-shell--disabled': disabled,
      })}
    >
      {name ? <input type="hidden" name={name} value={currentValue} /> : null}

      <button
        id={selectId}
        type="button"
        className={cn('app-select', 'app-select__trigger', {
          'app-select--invalid': invalid,
          'app-select--open': isOpen,
        })}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendantId}
        aria-describedby={describedBy}
        aria-labelledby={labelledBy}
        aria-invalid={invalid ? 'true' : undefined}
        aria-haspopup="listbox"
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <span
          className={cn('app-select__value', {
            'app-select__value--placeholder': !selectedOption,
          })}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <span
          className={cn('app-select__chevron', {
            'app-select__chevron--open': isOpen,
          })}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5.25 7.5L10 12.25L14.75 7.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <div className="app-select__dropdown">
          <ul id={listboxId} className="app-select__list" role="listbox">
            {options.map((option, index) => (
              <li
                id={getOptionId(index)}
                key={option.value}
                className={cn('app-select__option', {
                  'app-select__option--selected': option.value === currentValue,
                  'app-select__option--highlighted': index === highlightedIndex,
                })}
                role="option"
                aria-selected={option.value === currentValue}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option.value)}
              >
                <span>{option.label}</span>

                {option.value === currentValue ? (
                  <span className="app-select__check" aria-hidden="true">
                    <svg viewBox="0 0 20 20">
                      <path
                        d="M5 10.5L8.5 14L15 7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
