import type { ReactNode } from 'react';
import { AppSurface } from '@/shared/ui/primitives';
import { cn } from '@/shared/lib/cn';

type SectionTag = 'section' | 'article' | 'aside' | 'div';
type SectionVariant = 'default' | 'soft' | 'outlined' | 'selected';
type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

export interface AppSectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  as?: SectionTag;
  variant?: SectionVariant;
  padding?: SectionPadding;
  actions?: ReactNode;
  className?: string;
}

export const AppSectionCard = ({
  title,
  description,
  children,
  as = 'section',
  variant = 'default',
  padding = 'lg',
  actions,
  className,
}: AppSectionCardProps) => (
  <AppSurface
    as={as}
    variant={variant}
    padding={padding}
    className={cn('app-section', className)}
  >
    {title || description || actions ? (
      <div className="app-section__header">
        {title || description ? (
          <div className="app-stack app-stack--sm">
            {title ? <h2 className="app-section__title">{title}</h2> : null}
            {description ? <p className="app-section__text">{description}</p> : null}
          </div>
        ) : null}
        {actions ? <div className="app-section-card__actions">{actions}</div> : null}
      </div>
    ) : null}
    {children}
  </AppSurface>
);
