import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { cn } from '@/shared/lib/cn'

export interface AppSelectOption {
  label: string
  value: string
}

export interface AppSelectProps {
  id?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  options: AppSelectOption[]
  searchable?: boolean
  searchPlaceholder?: string
  noOptionsText?: string
  maxDropdownHeight?: number
  name?: string
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  labelledBy?: string
  onValueChange?: (value: string) => void
}

export const AppSelect = ({
  id,
  value,
  defaultValue,
  placeholder = 'Select value',
  options,
  searchable = false,
  searchPlaceholder = 'Search options',
  noOptionsText = 'No options found',
  maxDropdownHeight = 280,
  name,
  disabled = false,
  invalid = false,
  describedBy,
  labelledBy,
  onValueChange,
}: AppSelectProps) => {
  const fallbackId = useId()
  const selectId = id ?? fallbackId
  const listboxId = `${selectId}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<Array<HTMLLIElement | null>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownPlacement, setDropdownPlacement] = useState<'top' | 'bottom'>('bottom')
  const [dropdownViewportHeight, setDropdownViewportHeight] = useState(maxDropdownHeight)
  const currentValue = value ?? internalValue

  const selectedOption = useMemo(
    () => options.find((option) => option.value === currentValue) ?? null,
    [currentValue, options],
  )

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const visibleOptions = useMemo(() => {
    if (!searchable || !normalizedQuery) {
      return options
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
  }, [normalizedQuery, options, searchable])

  const selectedIndex = useMemo(
    () => visibleOptions.findIndex((option) => option.value === currentValue),
    [currentValue, visibleOptions],
  )

  const highlightedOptionIndex = useMemo(() => {
    if (!isOpen) {
      return -1
    }

    if (highlightedIndex >= 0 && highlightedIndex < visibleOptions.length) {
      return highlightedIndex
    }

    return selectedIndex >= 0 ? selectedIndex : visibleOptions.length ? 0 : -1
  }, [highlightedIndex, isOpen, selectedIndex, visibleOptions.length])

  const activeDescendantId =
    isOpen && highlightedOptionIndex >= 0 && visibleOptions[highlightedOptionIndex]
      ? `${selectId}-option-${highlightedOptionIndex}`
      : undefined

  const getOptionId = (index: number) => `${selectId}-option-${index}`

  const updateDropdownMetrics = useCallback(() => {
    if (!rootRef.current) {
      return
    }

    const viewportPadding = 12
    const dropdownOffset = 8
    const minPreferredHeight = 220
    const bounds = rootRef.current.getBoundingClientRect()
    const availableBelow = window.innerHeight - bounds.bottom - dropdownOffset - viewportPadding
    const availableAbove = bounds.top - dropdownOffset - viewportPadding
    const openTop = availableBelow < minPreferredHeight && availableAbove > availableBelow
    const availableHeight = openTop ? availableAbove : availableBelow

    setDropdownPlacement(openTop ? 'top' : 'bottom')
    setDropdownViewportHeight(
      Math.max(128, Math.floor(Math.min(maxDropdownHeight, availableHeight))),
    )
  }, [maxDropdownHeight])

  const close = useCallback((closeOptions?: { focusTrigger?: boolean }) => {
    setIsOpen(false)
    setHighlightedIndex(-1)
    setSearchQuery('')

    if (closeOptions?.focusTrigger) {
      triggerRef.current?.focus()
    }
  }, [])

  const open = (initialQuery = '') => {
    if (disabled) {
      return
    }

    setIsOpen(true)
    setSearchQuery(searchable ? initialQuery : '')

    requestAnimationFrame(() => {
      updateDropdownMetrics()

      if (searchable) {
        searchInputRef.current?.focus()
      }
    })
  }

  const toggle = () => {
    if (isOpen) {
      close()
      return
    }

    open()
  }

  const selectOption = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
    close({ focusTrigger: true })
  }

  const moveHighlight = (step: 1 | -1) => {
    if (!visibleOptions.length) {
      return
    }

    if (!isOpen) {
      open()
      return
    }

    setHighlightedIndex((currentIndex) => {
      const baseIndex =
        currentIndex >= 0 && currentIndex < visibleOptions.length
          ? currentIndex
          : highlightedOptionIndex

      return baseIndex < 0
        ? 0
        : (baseIndex + step + visibleOptions.length) % visibleOptions.length
    })
  }

  const getHighlightedOption = () => visibleOptions[highlightedOptionIndex] ?? null

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleWindowChange = () => {
      updateDropdownMetrics()
    }

    window.addEventListener('resize', handleWindowChange)
    window.addEventListener('scroll', handleWindowChange, true)

    return () => {
      window.removeEventListener('resize', handleWindowChange)
      window.removeEventListener('scroll', handleWindowChange, true)
    }
  }, [isOpen, updateDropdownMetrics])

  useEffect(() => {
    if (!isOpen || highlightedOptionIndex < 0) {
      return
    }

    optionRefs.current[highlightedOptionIndex]?.scrollIntoView?.({
      block: 'nearest',
    })
  }, [highlightedOptionIndex, isOpen])

  useEffect(() => {
    const handleDocumentPointerDown = (event: MouseEvent) => {
      const target = event.target

      if (!rootRef.current || !(target instanceof Node)) {
        return
      }

      if (!rootRef.current.contains(target)) {
        close()
      }
    }

    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('mousedown', handleDocumentPointerDown)
    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleDocumentPointerDown)
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  }, [close])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveHighlight(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveHighlight(-1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (!isOpen) {
          open()
        } else {
          const option = getHighlightedOption()

          if (option) {
            selectOption(option.value)
          }
        }
        break
      case 'Tab':
        close()
        break
      case 'Escape':
        close()
        break
      default:
        if (
          searchable &&
          !isOpen &&
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          event.preventDefault()
          open(event.key)
        }
        break
    }
  }

  const handleSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveHighlight(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveHighlight(-1)
        break
      case 'Enter': {
        const option = getHighlightedOption()
        if (option) {
          event.preventDefault()
          selectOption(option.value)
        }
        break
      }
      case 'Escape':
        event.preventDefault()
        close({ focusTrigger: true })
        break
      case 'Tab':
        close()
        break
      default:
        break
    }
  }

  const dropdownStyle = {
    '--app-select-dropdown-max-height': `${dropdownViewportHeight}px`,
  } as CSSProperties

  return (
    <div
      ref={rootRef}
      className={cn('app-select-shell', {
        'app-select-shell--disabled': disabled,
      })}
    >
      {name ? <input type="hidden" name={name} value={currentValue} /> : null}

      <button
        ref={triggerRef}
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
        <div
          className={cn('app-select__dropdown', {
            'app-select__dropdown--top': dropdownPlacement === 'top',
          })}
          style={dropdownStyle}
        >
          {searchable ? (
            <div className="app-select__search-row">
              <input
                ref={searchInputRef}
                className="app-select__search-input"
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                aria-label="Filter options"
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          ) : null}

          <ul id={listboxId} className="app-select__list" role="listbox">
            {visibleOptions.length ? (
              visibleOptions.map((option, index) => (
                <li
                  id={getOptionId(index)}
                  key={option.value}
                  ref={(node) => {
                    optionRefs.current[index] = node
                  }}
                  className={cn('app-select__option', {
                    'app-select__option--selected': option.value === currentValue,
                    'app-select__option--highlighted': index === highlightedOptionIndex,
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
              ))
            ) : (
              <li className="app-select__empty" role="presentation">
                {noOptionsText}
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
