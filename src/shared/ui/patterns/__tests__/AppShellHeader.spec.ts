import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShellHeader } from '@/shared/ui/patterns';
import { withAppProviders } from '@/tests/renderWithProviders';

describe('AppShellHeader', () => {
  it('renders legacy products and pricing tabs', () => {
    const { Wrapper } = withAppProviders();

    render(React.createElement(AppShellHeader, { showAllDivisionsLink: false }), {
      wrapper: Wrapper,
    });

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

    render(React.createElement(AppShellHeader, { showAllDivisionsLink: true }), {
      wrapper: Wrapper,
    });

    expect(screen.getByRole('link', { name: 'All divisions' })).toBeInTheDocument();
  });
});
