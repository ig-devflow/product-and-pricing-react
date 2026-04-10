import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAppShellNavigation } from '@/shared/composables/useAppShellNavigation';

describe('useAppShellNavigation', () => {
  it('returns legacy tabs in stable order', () => {
    const { result } = renderHook(() => useAppShellNavigation());

    expect(result.current.tabs.map((tab) => tab.label)).toEqual([
      'Pricelist',
      'Products',
      'Pricing Reference Data',
      'Calculator',
    ]);
  });
});
