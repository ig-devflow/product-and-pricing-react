import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import {
  divisionManagerContextualRouteMeta,
  divisionManagerRouteMeta,
  type AppRouteHandle,
} from '@/app/config/app-shell';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';

interface WrapperProps {
  children: ReactNode;
}

const createDataRouterWrapper = (initialEntries: string[] = ['/']) => {
  const Wrapper = ({ children }: WrapperProps) => {
    const router = createMemoryRouter(
      [
        {
          path: '/division-manager',
          element: <>{children}</>,
          handle: {
            shell: divisionManagerRouteMeta,
          } satisfies AppRouteHandle,
        },
        {
          path: '/division-manager/create',
          element: <>{children}</>,
          handle: {
            shell: divisionManagerContextualRouteMeta,
          } satisfies AppRouteHandle,
        },
        {
          path: '/division-manager/:divisionId',
          element: <>{children}</>,
          handle: {
            shell: divisionManagerContextualRouteMeta,
          } satisfies AppRouteHandle,
        },
        {
          path: '/division-manager/:divisionId/edit',
          element: <>{children}</>,
          handle: {
            shell: divisionManagerContextualRouteMeta,
          } satisfies AppRouteHandle,
        },
        {
          path: '*',
          element: <>{children}</>,
        },
      ],
      {
        initialEntries,
      },
    );

    return <RouterProvider router={router} />;
  };

  return Wrapper;
};

describe('useAppShellNavigation', () => {
  it('returns tabs in stable order', () => {
    const Wrapper = createDataRouterWrapper();
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
    const Wrapper = createDataRouterWrapper(['/division-manager/create']);
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
    const Wrapper = createDataRouterWrapper(['/missing-route']);
    const { result } = renderHook(() => useAppShellNavigation(), {
      wrapper: Wrapper,
    });

    expect(result.current.topTabs.some((tab) => tab.isActive)).toBe(false);
    expect(result.current.showAllDivisionsLink).toBe(false);
  });
});
