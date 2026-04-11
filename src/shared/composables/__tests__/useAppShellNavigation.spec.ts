import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAppShellNavigation } from '@/shared/composables/useAppShellNavigation';
import { withAppProviders } from '@/tests/renderWithProviders';

describe('useAppShellNavigation', () => {
  it('returns legacy tabs in stable order', () => {
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
});
