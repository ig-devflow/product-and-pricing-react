import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router';
import { AppNavLink } from '@/shared/ui/primitives';
import { withAppProviders } from '@/tests/renderWithProviders';

describe('AppNavLink', () => {
  it('applies active class for matching route', () => {
    const { Wrapper } = withAppProviders({
      initialEntries: ['/division-manager'],
    });

    render(
      React.createElement(
        Routes,
        null,
        React.createElement(Route, {
          path: '/division-manager',
          element: React.createElement(
            AppNavLink,
            { to: '/division-manager' },
            'Divisions',
          ),
        }),
      ),
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('link', { name: 'Divisions' })).toHaveClass('is-active');
  });

  it('renders plain link mode when forceLink is true', () => {
    const { Wrapper } = withAppProviders();

    render(
      React.createElement(
        AppNavLink,
        { to: '/division-manager', forceLink: true },
        'Divisions',
      ),
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('link', { name: 'Divisions' })).toHaveAttribute(
      'href',
      '/division-manager',
    );
  });
});
