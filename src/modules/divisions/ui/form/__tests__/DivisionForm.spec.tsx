import type { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { createEmptyDivisionFormValues } from '@/modules/divisions/model/mappers';
import { ContentFormat } from '@/modules/divisions/model/content-format';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import type { DivisionDetails } from '@/modules/divisions/model/types';
import { withAppProviders } from '@/tests/renderWithProviders';

function createValidValues(overrides: Partial<DivisionFormValues> = {}): DivisionFormValues {
  const emptyValues = createEmptyDivisionFormValues();

  return {
    ...emptyValues,
    name: 'EC Malta',
    websiteUrl: 'https://ecenglish.com/en/malta/',
    headOfficeEmail: 'hello@ecenglish.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    ...overrides,
    contactAddress: {
      ...emptyValues.contactAddress,
      ...overrides.contactAddress,
    },
    texts: overrides.texts ?? emptyValues.texts,
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
    contactAddress: {
      street: '',
      district: '',
      city: '',
      postalCode: '',
      countryId: 2,
    },
    accreditationBanner: null,
    headOfficeEmail: 'qa@example.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    texts: [
      {
        id: 91,
        contentTemplateId: 10,
        contentTemplateName: 'Visa letter note',
        audienceId: null,
        audienceName: '',
        content: 'Existing note',
        format: ContentFormat.PlainText,
      },
    ],
    version: 'AAAAAAAAB9E=',
    createdAt: '2026-05-10T14:08:00Z',
    createdByName: 'System User',
    updatedAt: '',
    updatedByName: '',
    createdAtText: '10 May 2026, 14:08',
    createdByText: 'System User',
    updatedAtText: '',
    updatedByText: 'Unknown editor',
  };
}

function renderDivisionForm(props: ComponentProps<typeof DivisionForm>) {
  const { Wrapper } = withAppProviders();
  return render(<DivisionForm {...props} />, { wrapper: Wrapper });
}

describe('DivisionForm', () => {
  it('submits valid form values', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    renderDivisionForm({
      defaultValues: createValidValues(),
      submitLabel: 'Create division',
      onSubmit: handleSubmit,
    });

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();

    renderDivisionForm({
      defaultValues: createEmptyDivisionFormValues(),
      submitLabel: 'Create division',
      onSubmit: vi.fn(),
    });

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    expect(await screen.findAllByText('This field is required')).not.toHaveLength(0);
  });

  it('renders country options from reference data and submits selected country id', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    renderDivisionForm({
      defaultValues: createValidValues(),
      submitLabel: 'Create division',
      onSubmit: handleSubmit,
    });

    const countrySelect = screen.getByRole('combobox', { name: 'Country' });
    await waitFor(() => {
      expect(countrySelect).not.toBeDisabled();
    });

    await user.click(countrySelect);
    await user.type(screen.getByPlaceholderText('Search countries'), 'ire');
    await user.click(await screen.findByRole('option', { name: 'Ireland (IE)' }));
    expect(countrySelect).toHaveTextContent('Ireland (IE)');

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    const submittedValues = handleSubmit.mock.calls.at(0)?.[0];

    expect(submittedValues).toMatchObject({
      contactAddress: {
        countryId: '1',
      },
    });
  });

  it('requires country when address data is entered', async () => {
    const user = userEvent.setup();

    renderDivisionForm({
      defaultValues: createValidValues({
        contactAddress: {
          street: 'Grand Canal Quay',
          district: '',
          city: '',
          postalCode: '',
          countryId: '',
        },
      }),
      submitLabel: 'Create division',
      onSubmit: vi.fn(),
    });

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    expect(
      await screen.findByText('Country is required when address is provided'),
    ).toBeInTheDocument();
  });

  it('adds text content rows and submits selected template, audience, format, and content', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    renderDivisionForm({
      defaultValues: createValidValues(),
      submitLabel: 'Create division',
      onSubmit: handleSubmit,
    });

    await user.click(screen.getByRole('button', { name: 'Add text' }));

    const templateSelect = screen.getByRole('combobox', { name: 'Content template' });
    await waitFor(() => {
      expect(templateSelect).not.toBeDisabled();
    });
    await user.click(templateSelect);
    await user.click(await screen.findByRole('option', { name: 'Visa letter note' }));

    const audienceSelect = screen.getByRole('combobox', { name: 'Audience' });
    await waitFor(() => {
      expect(audienceSelect).not.toBeDisabled();
    });
    await user.click(audienceSelect);
    await user.click(await screen.findByRole('option', { name: 'Student' }));

    const formatSelect = screen.getByRole('combobox', { name: 'Format' });
    expect(formatSelect).toHaveTextContent('Plain text');
    await user.click(formatSelect);
    await user.click(screen.getByRole('option', { name: 'HTML' }));

    await user.type(
      screen.getByRole('textbox', { name: 'Content' }),
      'Text content for testing',
    );

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    expect(handleSubmit.mock.calls.at(0)?.[0]).toMatchObject({
      texts: [
        {
          contentTemplateId: '10',
          audienceId: '1',
          content: 'Text content for testing',
          format: ContentFormat.Html,
        },
      ],
    });
  });

  it('prevents duplicate text content keys', async () => {
    const user = userEvent.setup();

    renderDivisionForm({
      defaultValues: createValidValues({
        texts: [
          {
            textId: null,
            contentTemplateId: '10',
            audienceId: '',
            content: 'First',
            format: ContentFormat.PlainText,
          },
          {
            textId: null,
            contentTemplateId: '10',
            audienceId: '',
            content: 'Second',
            format: ContentFormat.PlainText,
          },
        ],
      }),
      submitLabel: 'Create division',
      onSubmit: vi.fn(),
    });

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    expect(
      await screen.findByText('Duplicate text content for this template and audience'),
    ).toBeInTheDocument();
  });

  it('keeps entered values in create mode when defaultValues reference changes but resetKey stays same', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    const { rerender } = renderDivisionForm({
      mode: 'create',
      defaultValues: createValidValues({ name: 'Initial from props' }),
      submitLabel: 'Create division',
      onSubmit: handleSubmit,
    });

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

    expect(screen.getByRole('textbox', { name: 'Division name' })).toHaveValue('Draft name');
  });

  it('resets form in edit mode when resetKey changes because division id changes', async () => {
    const user = userEvent.setup();
    const { rerender } = renderDivisionForm({
      mode: 'edit',
      division: createDivisionDetails(10),
      defaultValues: createValidValues({
        name: 'EC Malta',
        contactAddress: {
          street: '',
          district: '',
          city: '',
          postalCode: '',
          countryId: '2',
        },
      }),
      submitLabel: 'Save changes',
      onSubmit: vi.fn(),
    });

    const nameInput = screen.getByRole('textbox', { name: 'Division name' });
    await user.clear(nameInput);
    await user.type(nameInput, 'Local edit');
    expect(nameInput).toHaveValue('Local edit');

    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: 'Country' })).toHaveTextContent(
        'Malta (MT)',
      );
      expect(
        screen.getByText('Malta', {
          selector: '.division-form-aside__value--address',
        }),
      ).toBeInTheDocument();
    });

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
      expect(screen.getByRole('textbox', { name: 'Division name' })).toHaveValue('EC Dublin');
    });
  });
});
