import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withAppProviders } from '@/tests/renderWithProviders';
import type { DivisionListItem } from '@/modules/divisions/model/types';
import { DivisionCard } from '../DivisionCard';

function createDivisionListItem(
  overrides: Partial<DivisionListItem> = {},
): DivisionListItem {
  return {
    id: 7,
    name: 'Test Division Alpha',
    isActive: true,
    websiteUrl: 'https://test-division-alpha.example.com',
    headOfficeEmail: 'division.alpha@example.com',
    city: 'London',
    countryName: 'United Kingdom',
    createdAt: '2026-05-10T14:08:00Z',
    createdByName: 'System User',
    updatedAt: '2026-05-10T15:30:00Z',
    updatedByName: 'Andrei Dzemianchyk',
    websiteDisplayUrl: 'test-division-alpha.example.com',
    locationText: 'London, United Kingdom',
    createdAtText: '10 May 2026, 14:08',
    createdByText: 'System User',
    updatedAtText: '10 May 2026, 15:30',
    updatedByText: 'Andrei Dzemianchyk',
    ...overrides,
  };
}

function renderCard(division = createDivisionListItem()) {
  const { Wrapper } = withAppProviders();

  return render(
    <DivisionCard division={division} detailsHref="/divisions/7" editHref="/divisions/7/edit" />,
    { wrapper: Wrapper },
  );
}

describe('DivisionCard', () => {
  it('renders horizontal admin metadata without banner images', () => {
    const { container } = renderCard();

    expect(screen.getByRole('heading', { name: 'Test Division Alpha' })).toBeVisible();
    expect(screen.getByText('Active')).toBeVisible();
    expect(screen.getByText('TD')).toBeVisible();
    expect(screen.getByText('test-division-alpha.example.com')).toBeVisible();
    expect(screen.getByText('London, United Kingdom')).toBeVisible();
    expect(screen.getByText('division.alpha@example.com')).toBeVisible();
    expect(screen.getByText('10 May 2026, 14:08 by System User')).toBeVisible();
    expect(screen.getByText('10 May 2026, 15:30 by Andrei Dzemianchyk')).toBeVisible();
    expect(container.querySelector('.division-card img')).not.toBeInTheDocument();
  });

  it('renders missing values as readable fallback text', () => {
    renderCard(
      createDivisionListItem({
        websiteUrl: '',
        websiteDisplayUrl: '',
        headOfficeEmail: '',
        locationText: '',
        updatedAt: '',
        updatedAtText: '',
        updatedByName: '',
        updatedByText: 'Unknown editor',
      }),
    );

    expect(screen.getByText('Website not set')).toBeVisible();
    expect(screen.getByText('Location not set')).toBeVisible();
    expect(screen.getByText('Head office email not set')).toBeVisible();
    expect(screen.getByText('Not updated yet')).toBeVisible();
  });
});
