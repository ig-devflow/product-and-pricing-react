import { AppPill } from '@/shared/ui/data-display';
import { AppButton, AppSurface } from '@/shared/ui/primitives';
import { getCentreInitials } from '@/modules/centres/model/helpers';
import type { CentreDetails } from '@/modules/centres/model/types';

export interface CentreDetailsHeroProps {
  centre: CentreDetails;
  countryName?: string;
  onBack: () => void;
  onEdit: () => void;
}

export const CentreDetailsHero = ({
  centre,
  countryName,
  onBack,
  onEdit,
}: CentreDetailsHeroProps) => {
  const brand = centre.contactInfo.brandColor || null;
  const initials = getCentreInitials(centre.name);
  const city = centre.contactInfo.contactAddress?.city;
  const brandStyle = brand
    ? ({ '--centre-brand': brand, '--centre-brand-bg': `color-mix(in srgb, ${brand} 12%, transparent)` } as React.CSSProperties)
    : undefined;

  return (
    <AppSurface padding="none" className="centre-details-hero">
      <div className="centre-details-hero__media">
        {centre.contactInfo.logoImage?.base64 ? (
          <img
            src={`data:${centre.contactInfo.logoImage.contentType};base64,${centre.contactInfo.logoImage.base64}`}
            alt={`${centre.name} logo`}
          />
        ) : (
          <div className="centre-details-hero__placeholder">
            <span className="centre-details-hero__placeholder-initials">{initials}</span>
            <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'var(--font-size-sm)' }}>No logo uploaded</span>
          </div>
        )}
      </div>
      <div className="centre-details-hero__body">
        <div className="centre-details-hero__header">
          <div className="centre-details-hero__title-area">
            <h2 className="centre-details-hero__title">{centre.name}</h2>
            <div className="centre-details-hero__chips">
              <span className="centre-card__code" style={brandStyle}>{centre.code}</span>
              <AppPill variant={centre.isActive ? 'success' : 'neutral'}>
                {centre.isActive ? 'Active' : 'Inactive'}
              </AppPill>
              <AppPill variant="info">
                {centre.isPhysicalCentre ? 'Physical centre' : 'Online'}
              </AppPill>
            </div>
          </div>
          <div className="centre-details-hero__actions">
            <AppButton variant="ghost" onClick={onBack}>Back to centres</AppButton>
            <AppButton variant="primary" onClick={onEdit}>Edit centre</AppButton>
          </div>
        </div>
        <p style={{ margin: 0, color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-md)', lineHeight: 1.65 }}>
          {city ? <>Based in {city}{countryName ? `, ${countryName}` : ''}. </> : null}
          Review the centre's contact, legal, banking, and content settings below.
        </p>
      </div>
    </AppSurface>
  );
};
