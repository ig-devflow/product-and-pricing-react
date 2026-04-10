import { useFormContext } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { AppField } from '@/shared/ui/controls';
import { AppInput } from '@/shared/ui/primitives';
import { AppSectionCard } from '@/shared/ui/patterns';

export const GeneralInformationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();

  return (
    <AppSectionCard title="General information">
      <div className="division-form__section-grid">
        <AppField id="division-name" label="Division name" error={errors.name?.message} required>
          <AppInput id="division-name" {...register('name')} />
        </AppField>

        <AppField id="division-website-url" label="Website URL" error={errors.websiteUrl?.message} required>
          <AppInput id="division-website-url" {...register('websiteUrl')} />
        </AppField>

        <AppField
          id="division-head-office-email"
          label="Head office email"
          error={errors.headOfficeEmailAddress?.message}
          required
        >
          <AppInput id="division-head-office-email" {...register('headOfficeEmailAddress')} />
        </AppField>

        <AppField
          id="division-head-office-phone"
          label="Head office phone"
          error={errors.headOfficeTelephoneNo?.message}
          required
        >
          <AppInput id="division-head-office-phone" {...register('headOfficeTelephoneNo')} />
        </AppField>
      </div>
    </AppSectionCard>
  );
};
