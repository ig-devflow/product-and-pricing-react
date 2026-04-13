import { Link, type To } from 'react-router'

export interface AppBrandMarkProps {
  to: To
  title?: string
  subtitle?: string
  ariaLabel?: string
}

export const AppBrandMark = ({ to, title = '', subtitle = '', ariaLabel }: AppBrandMarkProps) => (
  <Link to={to} className="app-brand-mark" aria-label={ariaLabel}>
    <span className="app-brand-mark__title">{title}</span>
    <span className="app-brand-mark__subtitle">{subtitle}</span>
  </Link>
)
