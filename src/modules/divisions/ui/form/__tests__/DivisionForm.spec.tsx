import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { createEmptyDivisionFormValues } from '@/modules/divisions/model/mappers';
import { ContentFormat } from '@/modules/divisions/model/content-format';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import type { DivisionDetails } from '@/modules/divisions/model/types';

function createValidValues(overrides: Partial<DivisionFormValues> = {}): DivisionFormValues {
  const emptyValues = createEmptyDivisionFormValues();

  return {
    ...emptyValues,
    name: 'EC Malta',
    websiteUrl: 'https://ecenglish.com/en/malta/',
    headOfficeEmailAddress: 'hello@ecenglish.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    ...overrides,
    address: {
      ...emptyValues.address,
      ...overrides.address,
    },
  };
}

function createDivisionDetails(id: number): DivisionDetails {
  return {
    id,
    name: `Division ${id}`,
    isActive: true,
    websiteUrl: `https://division-${id}.example.com`,
    termsAndConditions: 'Terms',
    groupsPaymentTerms: 'Groups terms',
    visaLetterNote: 'Visa note',
    visaLetterNoteFormat: ContentFormat.PlainText,
    address: {
      id: null,
      line1: '',
      line2: '',
      line3: '',
      line4: '',
      countryIsoCode: '',
    },
    accreditationBanner: null,
    createdOn: '2026-04-01T00:00:00Z',
    createdBy: 'qa@example.com',
    lastModifiedOn: '2026-04-01T00:00:00Z',
    lastModifiedBy: 'qa@example.com',
    years: [2026],
    headOfficeEmailAddress: 'qa@example.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    reportTexts: [],
  };
}

describe('DivisionForm', () => {
  it('submits valid form values', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <DivisionForm
        defaultValues={createValidValues()}
        submitLabel="Create division"
        onSubmit={handleSubmit}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();

    render(
      <DivisionForm
        defaultValues={createEmptyDivisionFormValues()}
        submitLabel="Create division"
        onSubmit={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    expect(await screen.findAllByText('This field is required')).not.toHaveLength(0);
  });

  it('renders visa-letter format field and submits selected format', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <DivisionForm
        defaultValues={createValidValues({
          visaLetterNoteFormat: ContentFormat.PlainText,
        })}
        submitLabel="Create division"
        onSubmit={handleSubmit}
      />,
    );

    const formatSelect = screen.getByRole('combobox', {
      name: 'Visa letter note format',
    });
    expect(formatSelect).toHaveTextContent('Plain text');

    await user.click(formatSelect);
    await user.click(screen.getByRole('option', { name: 'HTML' }));
    expect(formatSelect).toHaveTextContent('HTML');

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    const submittedValues = handleSubmit.mock.calls.at(0)?.[0];

    expect(submittedValues).toMatchObject({
      visaLetterNoteFormat: ContentFormat.Html,
    });
  });

  it('keeps entered values in create mode when defaultValues reference changes but resetKey stays same', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    const { rerender } = render(
      <DivisionForm
        mode="create"
        defaultValues={createValidValues({ name: 'Initial from props' })}
        submitLabel="Create division"
        onSubmit={handleSubmit}
      />,
    );

    const nameInput = screen.getByRole('textbox', { name: 'Division name' });
    await user.clear(nameInput);
    await user.type(nameInput, 'Draft name');
    expect(nameInput).toHaveValue('Draft name');

    rerender(
      <DivisionForm
        mode="create"
        defaultValues={createValidValues({ name: 'New props value' })}
        submitLabel="Create division"
        onSubmit={handleSubmit}
      />,
    );

    expect(screen.getByRole('textbox', { name: 'Division name' })).toHaveValue(
      'Draft name',
    );
  });

  it('resets form in edit mode when resetKey changes because division id changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <DivisionForm
        mode="edit"
        division={createDivisionDetails(10)}
        defaultValues={createValidValues({ name: 'EC Malta' })}
        submitLabel="Save changes"
        onSubmit={vi.fn()}
      />,
    );

    const nameInput = screen.getByRole('textbox', { name: 'Division name' });
    await user.clear(nameInput);
    await user.type(nameInput, 'Local edit');
    expect(nameInput).toHaveValue('Local edit');

    const formatSelect = screen.getByRole('combobox', {
      name: 'Visa letter note format',
    });
    await user.click(formatSelect);
    await user.click(screen.getByRole('option', { name: 'HTML' }));
    expect(formatSelect).toHaveTextContent('HTML');

    rerender(
      <DivisionForm
        mode="edit"
        division={createDivisionDetails(11)}
        defaultValues={createValidValues({ name: 'EC Dublin' })}
        submitLabel="Save changes"
        onSubmit={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Division name' })).toHaveValue(
        'EC Dublin',
      );
      expect(
        screen.getByRole('combobox', {
          name: 'Visa letter note format',
        }),
      ).toHaveTextContent('Plain text');
    });
  });
});
