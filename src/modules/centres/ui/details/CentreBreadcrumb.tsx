export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface CentreBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const CentreBreadcrumb = ({ items }: CentreBreadcrumbProps) => (
  <nav className="breadcrumb" aria-label="Breadcrumb">
    {items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span className="breadcrumb__sep" aria-hidden="true">›</span>}
          {isLast ? (
            <span className="breadcrumb__current">{item.label}</span>
          ) : (
            <button
              type="button"
              className="app-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-link-default)' }}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          )}
        </span>
      );
    })}
  </nav>
);
