import { useRef } from 'react';

export interface ColourSwatchInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}

export const ColourSwatchInput = ({ id, value, onChange, invalid }: ColourSwatchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="colour-swatch-input" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <div
        className="colour-swatch-input__chip"
        style={{ '--swatch-color': value || 'var(--color-bg-surface-soft)' } as React.CSSProperties}
        title="Click to pick a colour"
      >
        <input
          ref={inputRef}
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Colour picker"
        />
      </div>
      <input
        id={id}
        type="text"
        className={`app-input${invalid ? ' app-input--invalid' : ''}`}
        value={value}
        placeholder="#FF0000"
        onChange={(e) => onChange(e.target.value)}
        style={{ fontFamily: 'var(--font-family-mono)', flex: 1 }}
      />
    </div>
  );
};
