import { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';

export interface DivisionPageHeaderState {
  showAllDivisionsLink: boolean;
}

export const useDivisionPageHeader = (): DivisionPageHeaderState => {
  const location = useLocation();

  return useMemo(() => {
    const path = location.pathname;

    const onListPage = path === DIVISION_MANAGER_ROUTES.list;
    const onCreatePage = path === DIVISION_MANAGER_ROUTES.create;
    const onDetailsPage = Boolean(
      matchPath({ path: '/division-manager/:divisionId' }, path),
    );
    const onEditPage = Boolean(
      matchPath({ path: '/division-manager/:divisionId/edit' }, path),
    );

    return {
      showAllDivisionsLink: !onListPage && (onCreatePage || onDetailsPage || onEditPage),
    };
  }, [location.pathname]);
};
