import { Controller, useFormContext } from 'react-hook-form'
import type { AccommodationFormValues } from '@/modules/products/accommodations/model/form.types'
import { AppSectionCard } from '@/shared/ui/patterns'
import { AppSwitch } from '@/shared/ui/primitives'

export const CommitmentSection = () => {
  const { control, watch } = useFormContext<AccommodationFormValues>()
  const isCommitted = watch('isCommitted')
  const isNonCommitted = watch('isNonCommitted')

  return (
    <AppSectionCard
      id="section-commitment"
      title="Commitment"
      description="Whether the accommodation accepts committed or non-committed bookings."
    >
      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">Committed bookings</span>
          <span className="product-form-section__toggle-text">
            Allocation is guaranteed and held for the season.
          </span>
        </div>
        <Controller
          name="isCommitted"
          control={control}
          render={({ field }) => (
            <AppSwitch
              checked={Boolean(field.value)}
              label={isCommitted ? 'Yes' : 'No'}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">Non-committed bookings</span>
          <span className="product-form-section__toggle-text">
            Offered on a request / availability basis.
          </span>
        </div>
        <Controller
          name="isNonCommitted"
          control={control}
          render={({ field }) => (
            <AppSwitch
              checked={Boolean(field.value)}
              label={isNonCommitted ? 'Yes' : 'No'}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>
    </AppSectionCard>
  )
}
