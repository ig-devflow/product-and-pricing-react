import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShellHeader } from '@/shared/ui/patterns';
import { withAppProviders } from '@/tests/renderWithProviders';

const navigationFixture = {
  topTabs: [
    {
      id: 'pricelist',
      label: 'Pricelist',
      to: null,
      inert: true,
      isActive: false,
    },
    {
      id: 'products',
      label: 'Products',
      to: null,
      inert: true,
      isActive: false,
    },
    {
      id: 'pricing-reference-data',
      label: 'Pricing Reference Data',
      to: null,
      inert: true,
      isActive: true,
    },
    {
      id: 'calculator',
      label: 'Calculator',
      to: null,
      inert: true,
      isActive: false,
    },
  ],
  showAllDivisionsLink: false,
  allDivisionsTarget: '/division-manager',
};

describe('AppShellHeader', () => {
  it('renders legacy products and pricing tabs', () => {
    const { Wrapper } = withAppProviders();

    render(
      React.createElement(AppShellHeader, {
        navigation: navigationFixture,
        showAllDivisionsLink: false,
      }),
      {
        wrapper: Wrapper,
      },
    );

    const header = screen.getByRole('banner');
    const tabsNav = within(header).getByLabelText('Products and Pricing sections');

    expect(tabsNav).toHaveTextContent('Pricelist');
    expect(tabsNav).toHaveTextContent('Products');
    expect(tabsNav).toHaveTextContent('Pricing Reference Data');
    expect(tabsNav).toHaveTextContent('Calculator');
    expect(
      within(header).queryByRole('link', { name: 'All divisions' }),
    ).not.toBeInTheDocument();
  });

  it('shows contextual all divisions link when requested', () => {
    const { Wrapper } = withAppProviders();

    render(
      React.createElement(AppShellHeader, {
        navigation: navigationFixture,
        showAllDivisionsLink: true,
      }),
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.getByRole('link', { name: 'All divisions' })).toBeInTheDocument();
  });

  it('shows contextual all divisions link from provided navigation state', () => {
    const { Wrapper } = withAppProviders({
      initialEntries: ['/division-manager/create'],
    });

    render(
      React.createElement(AppShellHeader, {
        navigation: {
          ...navigationFixture,
          showAllDivisionsLink: true,
        },
      }),
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.getByRole('link', { name: 'All divisions' })).toBeInTheDocument();
  });
});
