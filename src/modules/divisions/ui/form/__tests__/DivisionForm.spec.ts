import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DivisionForm } from '@/modules/divisions/ui/form'
import { createDivisionFormDefaults } from '@/modules/divisions/model/factory'
import type { DivisionFormValues } from '@/modules/divisions/model/division-form'

function createValidValues(): DivisionFormValues {
  return {
    ...createDivisionFormDefaults(),
    name: 'EC Malta',
    websiteUrl: 'https://ecenglish.com/en/malta/',
    headOfficeEmailAddress: 'hello@ecenglish.com',
    headOfficeTelephoneNo: '+356 1234 5678',
  }
}

describe('DivisionForm', () => {
  it('submits valid form values', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(
      React.createElement(DivisionForm, {
        defaultValues: createValidValues(),
        submitLabel: 'Create division',
        onSubmit: handleSubmit,
      }),
    )

    await user.click(screen.getByRole('button', { name: 'Create division' }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup()

    render(
      React.createElement(DivisionForm, {
        defaultValues: createDivisionFormDefaults(),
        submitLabel: 'Create division',
        onSubmit: vi.fn(),
      }),
    )

    await user.click(screen.getByRole('button', { name: 'Create division' }))

    expect(await screen.findAllByText('This field is required')).not.toHaveLength(0)
  })
})
