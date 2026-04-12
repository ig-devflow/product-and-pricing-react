import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';
import { withAppProviders } from '@/tests/renderWithProviders';

describe('useAppShellNavigation', () => {
  it('returns tabs in stable order', () => {
    const { Wrapper } = withAppProviders();
    const { result } = renderHook(() => useAppShellNavigation(), {
      wrapper: Wrapper,
    });

    expect(result.current.topTabs.map((tab) => tab.label)).toEqual([
      'Pricelist',
      'Products',
      'Discounts',
      'Agents',
      'Pricing Reference Data',
      'New Pricing Year',
      'Calculator',
    ]);
  });

  it('derives active tab and contextual link from route metadata', () => {
    const { Wrapper } = withAppProviders({
      initialEntries: ['/division-manager/create'],
    });
    const { result } = renderHook(() => useAppShellNavigation(), {
      wrapper: Wrapper,
    });

    expect(
      result.current.topTabs.find((tab) => tab.id === 'pricing-reference-data')
        ?.isActive,
    ).toBe(true);
    expect(result.current.showAllDivisionsLink).toBe(true);
    expect(result.current.allDivisionsTarget).toBe('/division-manager');
  });

  it('does not expose contextual links for unknown routes', () => {
    const { Wrapper } = withAppProviders({
      initialEntries: ['/missing-route'],
    });
    const { result } = renderHook(() => useAppShellNavigation(), {
      wrapper: Wrapper,
    });

    expect(result.current.topTabs.some((tab) => tab.isActive)).toBe(false);
    expect(result.current.showAllDivisionsLink).toBe(false);
  });
});
