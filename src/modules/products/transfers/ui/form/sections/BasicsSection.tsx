import { Controller, useFormContext } from 'react-hook-form';
import type { TransferFormValues } from '@/modules/products/transfers/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch } from '@/shared/ui/primitives';
import { useTransferTypesQuery } from '@/shared/queries/useTransferTypesQuery';
import { useTransferPortsQuery } from '@/shared/queries/useTransferPortsQuery';

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2.5" y="6" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

interface BasicsSectionProps {
  divisionName: string;
}

export const BasicsSection = ({ divisionName }: BasicsSectionProps) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<TransferFormValues>();

  const isActive = watch('isActive');
  const transferTypesQuery = useTransferTypesQuery();
  const transferPortsQuery = useTransferPortsQuery();
  const transferTypeOptions = toOptions(transferTypesQuery.data);
  const transferPortOptions = toOptions(transferPortsQuery.data);

  return (
    <AppSectionCard
      id="section-basics"
      title="Basics"
      description="Name, transfer type, port, and current availability status."
    >
      <AppFormGrid columns={1}>
        <AppField label="Name" forId="transfer-name" error={errors.name?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="transfer-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. Standard Airport Transfer"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField label="Transfer type" forId="transfer-type" error={errors.transferTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="transferTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="transfer-type"
                  placeholder="Select transfer type…"
                  options={transferTypeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.transferTypeId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Transfer port" forId="transfer-port" error={errors.transferPortId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="transferPortId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="transfer-port"
                  placeholder="Select transfer port…"
                  options={transferPortOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.transferPortId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  searchable
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField
          label="Division"
          forId="transfer-division"
          hint="Determined by the division selected at the top of the workspace."
        >
          <div id="transfer-division" className="product-form-locked-field">
            <span className="product-form-locked-field__icon"><LockIcon /></span>
            <span>{divisionName}</span>
          </div>
        </AppField>
      </AppFormGrid>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">
            {isActive ? 'Active transfer' : 'Inactive transfer'}
          </span>
          <span className="product-form-section__toggle-text">
            Inactive products are hidden from pricing and bookings.
          </span>
        </div>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <AppSwitch
              checked={Boolean(field.value)}
              label={field.value ? 'Active' : 'Inactive'}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>
    </AppSectionCard>
  );
};
