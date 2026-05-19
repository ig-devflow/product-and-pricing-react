import { type ReactNode, useState } from 'react';

export interface CentreAccordionItemProps {
  title: string;
  meta?: string;
  rightSlot?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

export const CentreAccordionItem = ({
  title,
  meta,
  rightSlot,
  defaultOpen = false,
  children,
}: CentreAccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`accordion__item${open ? ' accordion__item--open' : ''}`}>
      <button
        type="button"
        className="accordion__header"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="accordion__title-area">
          <h3 className="accordion__title">{title}</h3>
          {meta ? <span className="accordion__meta">{meta}</span> : null}
        </div>
        <div className="accordion__right">
          {rightSlot}
          <svg className="accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 6 8 10 12 6" />
          </svg>
        </div>
      </button>
      {open ? <div className="accordion__body">{children}</div> : null}
    </div>
  );
};
