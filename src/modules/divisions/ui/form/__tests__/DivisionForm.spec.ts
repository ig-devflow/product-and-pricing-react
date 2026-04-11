import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { createDivisionFormDefaults } from '@/modules/divisions/model/factory';

describe('DivisionForm', () => {
  it('submits valid form values', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      React.createElement(DivisionForm, {
        defaultValues: createDivisionFormDefaults(),
        submitLabel: 'Create division',
        onSubmit: handleSubmit,
      }),
    );

    await user.type(screen.getByLabelText(/Division name/i), 'EC Dublin');
    await user.type(screen.getByLabelText(/Website URL/i), 'https://dublin.example.com');
    await user.type(screen.getByLabelText(/Head office email/i), 'dublin@ecenglish.com');
    await user.type(screen.getByLabelText(/Head office phone/i), '+353 1 234 5678');
    await user.type(screen.getByLabelText(/Address line 1/i), 'Grand Canal Quay');
    await user.type(screen.getByLabelText(/Country ISO code/i), 'ie');
    await user.type(screen.getByLabelText(/Terms and conditions/i), 'Terms');
    await user.type(screen.getByLabelText(/Groups payment terms/i), 'Groups terms');

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();

    render(
      React.createElement(DivisionForm, {
        defaultValues: createDivisionFormDefaults(),
        submitLabel: 'Create division',
        onSubmit: vi.fn(),
      }),
    );

    await user.click(screen.getByRole('button', { name: 'Create division' }));

    expect(await screen.findAllByText('This field is required')).not.toHaveLength(0);
  });
});
