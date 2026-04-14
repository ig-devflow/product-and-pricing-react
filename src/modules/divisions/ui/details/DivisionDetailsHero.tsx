import { AppPill } from '@/shared/ui/data-display';
import { AppButton, AppSurface } from '@/shared/ui/primitives';
import { getDivisionBannerSrc } from '@/modules/divisions/lib/banner';
import type { DivisionDetails } from '@/modules/divisions/model/types';

export interface DivisionDetailsHeroProps {
  division: DivisionDetails;
  onBack: () => void;
  onEdit: () => void;
}

export const DivisionDetailsHero = ({
  division,
  onBack,
  onEdit,
}: DivisionDetailsHeroProps) => {
  const bannerSrc = getDivisionBannerSrc(division.accreditationBanner);

  return (
    <AppSurface className="division-details-hero" padding="none">
      <div className="division-details-hero__media">
        {bannerSrc ? (
          <img
            className="division-details-hero__image"
            src={bannerSrc}
            alt={`${division.name} banner`}
          />
        ) : (
          <div className="division-details-hero__placeholder">
            No accreditation banner uploaded
          </div>
        )}
      </div>

      <div className="division-details-hero__body">
        <div className="division-details-hero__content">
          <div className="division-details-hero__header">
            <AppPill variant={division.isActive ? 'success' : 'neutral'}>
              {division.isActive ? 'Active division' : 'Inactive division'}
            </AppPill>

            <div className="division-details-hero__actions">
              <AppButton type="button" variant="ghost" onClick={onBack}>
                Back to list
              </AppButton>
              <AppButton type="button" variant="primary" onClick={onEdit}>
                Edit division
              </AppButton>
            </div>
          </div>

          <div className="app-stack app-stack--sm">
            <h2 className="division-details-hero__title">{division.name}</h2>
            <p className="division-details-hero__text">
              Review division content, contact details, and banner settings
              before editing.
            </p>
          </div>
        </div>
      </div>
    </AppSurface>
  );
};
