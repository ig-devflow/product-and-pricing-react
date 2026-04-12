import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { AppImageUploadField } from '@/shared/ui/controls';
import { AppSectionCard } from '@/shared/ui/patterns';
import {
  fileToDivisionBanner,
  getDivisionBannerSrc,
} from '@/modules/divisions/lib/banner';
import type { DivisionFormValues } from '@/modules/divisions/model/types';

const maxBannerSizeBytes = 5 * 1024 * 1024;
const allowedBannerTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
]);
const allowedBannerExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

function hasAllowedBannerExtension(fileName: string): boolean {
  const normalizedName = fileName.trim().toLowerCase();

  return allowedBannerExtensions.some((extension) =>
    normalizedName.endsWith(extension),
  );
}

function isAllowedBannerFile(file: File): boolean {
  if (file.type && allowedBannerTypes.has(file.type)) {
    return true;
  }

  return hasAllowedBannerExtension(file.name);
}

export const BannerSection = () => {
  const { control } = useFormContext<DivisionFormValues>();
  const [bannerError, setBannerError] = useState('');
  const divisionName = useWatch({
    control,
    name: 'name',
  });

  return (
    <AppSectionCard
      title="Banner"
      description="Upload or replace the accreditation banner used for this division."
    >
      <Controller
        name="accreditationBanner"
        control={control}
        render={({ field }) => (
          <div className="app-stack app-stack--xs">
            <AppImageUploadField
              imageSrc={getDivisionBannerSrc(field.value)}
              imageAlt={`${divisionName || 'Division'} banner preview`}
              fileName={field.value?.fileName ?? ''}
              contentType={field.value?.contentType ?? ''}
              inputId="division-banner-input"
              label="Upload accreditation banner"
              hint="PNG, JPG, SVG, or WEBP files work well for the current backend payload."
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              buttonText="Choose file"
              emptyText="No file selected"
              onSelect={async (file) => {
                setBannerError('');

                if (!file) {
                  return;
                }

                if (!isAllowedBannerFile(file)) {
                  setBannerError(
                    'Please choose a PNG, JPG, SVG, or WEBP image.',
                  );
                  return;
                }

                if (file.size > maxBannerSizeBytes) {
                  setBannerError(
                    'The selected file is too large. Maximum size is 5 MB.',
                  );
                  return;
                }

                try {
                  const banner = await fileToDivisionBanner(file);
                  field.onChange(banner);
                } catch (error) {
                  console.error('Failed to read banner file', error);
                  setBannerError(
                    'Failed to read the selected file. Please choose a valid PNG, JPG, SVG, or WEBP image.',
                  );
                }
              }}
              onRemove={() => {
                setBannerError('');
                field.onChange(null);
              }}
            />

            {bannerError ? (
              <p
                className="division-form-banner-section__error"
                role="alert"
                aria-live="polite"
              >
                {bannerError}
              </p>
            ) : null}
          </div>
        )}
      />
    </AppSectionCard>
  );
};
