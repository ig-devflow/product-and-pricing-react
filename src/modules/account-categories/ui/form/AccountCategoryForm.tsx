import { useState, type FormEvent } from 'react';
import { AppField } from '@/shared/ui/controls';
import { AppFormActionsPanel, AppFormGrid } from '@/shared/ui/patterns';
import { AppButton, AppInput, AppSwitch } from '@/shared/ui/primitives';
import type { AccountCategoryFormValues } from '@/modules/account-categories/model/types';

const NAME_MAX_LENGTH = 100;

export interface AccountCategoryFormProps {
  mode: 'create' | 'edit';
  initial?: AccountCategoryFormValues;
  isSubmitting?: boolean;
  serverError?: string;
  onSubmit: (values: AccountCategoryFormValues) => void;
  onCancel: () => void;
}

function validate(values: AccountCategoryFormValues): Partial<Record<keyof AccountCategoryFormValues, string>> {
  const errors: Partial<Record<keyof AccountCategoryFormValues, string>> = {};
  if (!values.name.trim()) {
    errors.name = 'Account category name is required.';
  } else if (values.name.trim().length > NAME_MAX_LENGTH) {
    errors.name = `Account category name must not exceed ${NAME_MAX_LENGTH} characters.`;
  }
  return errors;
}

export const AccountCategoryForm = ({
  mode,
  initial,
  isSubmitting = false,
  serverError,
  onSubmit,
  onCancel,
}: AccountCategoryFormProps) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [errors, setErrors] = useState<Partial<Record<keyof AccountCategoryFormValues, string>>>({});
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const values: AccountCategoryFormValues = { name, isActive };
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length === 0) {
      onSubmit(values);
    }
  };

  const submitLabel = mode === 'create' ? 'Create category' : 'Save changes';
  const actionTitle = mode === 'create' ? 'Ready to create this category?' : 'Ready to save your changes?';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AppFormGrid columns={1}>
        <AppField
          label="Name"
          required
          error={touched ? errors.name : undefined}
        >
          <AppInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter account category name"
            maxLength={NAME_MAX_LENGTH}
            invalid={touched && Boolean(errors.name)}
            disabled={isSubmitting}
          />
        </AppField>

        {mode === 'create' && (
          <AppField label="Active">
            <AppSwitch
              label="Mark as active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={isSubmitting}
            />
          </AppField>
        )}
      </AppFormGrid>

      {serverError && (
        <p className="app-field__error" style={{ marginTop: '1rem' }}>{serverError}</p>
      )}

      <AppFormActionsPanel title={actionTitle} description="Review the current values before saving.">
        <AppButton type="button" variant="ghost" disabled={isSubmitting} onClick={onCancel}>
          Cancel
        </AppButton>
        <AppButton type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </AppButton>
      </AppFormActionsPanel>
    </form>
  );
};
