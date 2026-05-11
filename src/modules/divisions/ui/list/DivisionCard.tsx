import type { To } from 'react-router';
import { AppPill } from '@/shared/ui/data-display';
import { AppButtonLink, AppSurface } from '@/shared/ui/primitives';
import { getDivisionInitials } from '@/modules/divisions/model/formatters';
import type { DivisionListItem } from '@/modules/divisions/model/types';

export interface DivisionCardProps {
  division: DivisionListItem;
  detailsHref: To;
  editHref: To;
}

interface DivisionCardFact {
  key: string;
  label: string;
  value: string;
  href?: string;
}

function isMissingFact(value: string): boolean {
  return value.endsWith('not set');
}

export const DivisionCard = ({
  division,
  detailsHref,
  editHref,
}: DivisionCardProps) => {
  const createdText = division.createdAtText
    ? `${division.createdAtText} by ${division.createdByText}`
    : `Unknown date by ${division.createdByText}`;
  const updatedText = division.updatedAtText
    ? `${division.updatedAtText} by ${division.updatedByText}`
    : 'Not updated yet';
  const facts: DivisionCardFact[] = [
    {
      key: 'location',
      label: 'Location',
      value: division.locationText || 'Location not set',
    },
    {
      key: 'website',
      label: 'Website',
      value: division.websiteDisplayUrl || 'Website not set',
      href: division.websiteUrl || undefined,
    },
    {
      key: 'head-office',
      label: 'Head office',
      value: division.headOfficeEmail || 'Head office email not set',
      href: division.headOfficeEmail
        ? `mailto:${division.headOfficeEmail}`
        : undefined,
    },
  ];

  return (
    <AppSurface className="app-card division-card" as="article" padding="none">
      <header className="division-card__header">
        <div className="division-card__marker" aria-hidden="true">
          {getDivisionInitials(division.name)}
        </div>

        <AppPill
          className="division-card__status"
          variant={division.isActive ? 'success' : 'neutral'}
        >
          {division.isActive ? 'Active' : 'Inactive'}
        </AppPill>
      </header>

      <div className="division-card__body">
        <p className="division-card__eyebrow">Division</p>
        <h2 className="division-card__title">{division.name}</h2>

        <div className="division-card__facts" aria-label="Division quick facts">
          {facts.map((item) => (
            <div key={item.key} className="division-card__fact">
              <span className="division-card__fact-label">{item.label}</span>
              <span
                className={
                  isMissingFact(item.value)
                    ? 'division-card__fact-value division-card__fact-value--muted'
                    : 'division-card__fact-value'
                }
              >
                {item.href ? (
                  <a className="app-link" href={item.href} target="_blank" rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="division-card__audit" aria-label="Division audit information">
          <div className="division-card__audit-item">
            <span>Created</span>
            <strong>{createdText}</strong>
          </div>
          <div className="division-card__audit-item">
            <span>Updated</span>
            <strong className={!division.updatedAtText ? 'division-card__audit-muted' : undefined}>
              {updatedText}
            </strong>
          </div>
        </div>
      </div>

      <footer className="division-card__actions">
        <AppButtonLink to={detailsHref} variant="ghost" size="sm">
          Open details
        </AppButtonLink>

        <AppButtonLink to={editHref} variant="primary" size="sm">
          Edit
        </AppButtonLink>
      </footer>
    </AppSurface>
  );
};
