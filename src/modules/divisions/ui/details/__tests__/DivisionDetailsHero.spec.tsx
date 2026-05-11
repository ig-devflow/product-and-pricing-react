import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DivisionDetailsHero } from '@/modules/divisions/ui/details/DivisionDetailsHero'
import type { DivisionDetails } from '@/modules/divisions/model/types'

function createDivisionDetails(overrides: Partial<DivisionDetails> = {}): DivisionDetails {
  return {
    id: 7,
    name: 'Test Division',
    isActive: true,
    websiteUrl: '',
    termsAndConditions: '',
    groupsPaymentTerms: '',
    contactAddress: {
      street: '',
      district: '',
      city: '',
      postalCode: '',
      countryId: null,
    },
    accreditationBanner: null,
    headOfficeEmail: '',
    headOfficeTelephoneNo: '',
    texts: [],
    version: 'AAAAAAAAB9E=',
    createdAt: '2026-05-10T14:08:00Z',
    createdByName: 'System User',
    updatedAt: '',
    updatedByName: '',
    createdAtText: '10 May 2026, 14:08',
    createdByText: 'System User',
    updatedAtText: '',
    updatedByText: 'Unknown editor',
    ...overrides,
  }
}

describe('DivisionDetailsHero', () => {
  it('renders a styled placeholder when banner is missing', () => {
    const { container } = render(
      <DivisionDetailsHero division={createDivisionDetails()} onBack={vi.fn()} onEdit={vi.fn()} />,
    )

    expect(screen.getByText('TD')).toBeVisible()
    expect(screen.getByText('No accreditation banner uploaded')).toBeVisible()
    expect(screen.getByText('Upload a banner when editing this division.')).toBeVisible()
    expect(container.querySelector('.division-details-hero__media img')).not.toBeInTheDocument()
  })

  it('renders banner image with accessible alt text when available', () => {
    render(
      <DivisionDetailsHero
        division={createDivisionDetails({
          accreditationBanner: {
            imageBase64:
              'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9pQxWb8AAAAASUVORK5CYII=',
            contentType: 'image/png',
            fileName: 'division.png',
          },
        })}
        onBack={vi.fn()}
        onEdit={vi.fn()}
      />,
    )

    expect(screen.getByRole('img', { name: 'Test Division banner' })).toBeVisible()
  })
})
