import { useEffect, useRef, useState } from 'react';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { useDivisionOptionsQuery } from '@/modules/divisions/queries/useDivisionOptionsQuery';

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6.5l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DivisionDropdown = () => {
  const { divisionId, divisionName, setDivision } = useDivisionContext();
  const { data: options = [], isLoading } = useDivisionOptionsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.length > 0 && divisionId === 0) {
      setDivision(options[0].id, options[0].name);
    }
  }, [options, divisionId, setDivision]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleSelect = (id: number, name: string) => {
    setDivision(id, name);
    setIsOpen(false);
  };

  const label = isLoading ? 'Loading…' : (divisionName || 'Select division');

  return (
    <div className="division-picker" ref={containerRef}>
      <button
        type="button"
        className="product-subnav__division-btn"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isLoading}
      >
        <span>{label}</span>
        <ChevronDownIcon />
      </button>
      {isOpen && (
        <div className="division-picker__dropdown" role="listbox" aria-label="Select division">
          {options.map((option) => {
            const isSelected = option.id === divisionId;
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`division-picker__option${isSelected ? ' is-selected' : ''}`}
                onClick={() => handleSelect(option.id, option.name)}
              >
                <span className="division-picker__option-label">{option.name}</span>
                {isSelected && (
                  <span className="division-picker__option-check">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
