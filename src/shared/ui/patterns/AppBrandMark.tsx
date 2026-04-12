import { Link, type To } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';

export interface AppBrandMarkProps {
  to?: To;
  title?: string;
  subtitle?: string;
}

export const AppBrandMark = ({
  to = DIVISION_MANAGER_ROUTES.list,
  title = 'Products & Pricing',
  subtitle = 'Division Manager',
}: AppBrandMarkProps) => (
  <Link to={to} className="app-brand-mark" aria-label="Products and Pricing home">
    <span className="app-brand-mark__title">{title}</span>
    <span className="app-brand-mark__subtitle">{subtitle}</span>
  </Link>
);
