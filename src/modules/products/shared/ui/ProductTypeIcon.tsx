export type ProductType = 'course' | 'accommodation' | 'room' | 'addon' | 'transfer' | 'package';

export interface ProductTypeIconProps {
  type: ProductType;
  size?: number;
  className?: string;
}

export const ProductTypeIcon = ({ type, size = 20, className }: ProductTypeIconProps) => {
  const props = { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', className, 'aria-hidden': true as const };

  if (type === 'course') {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.5 7.5h7M6.5 10h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'accommodation') {
    return (
      <svg {...props}>
        <path d="M3 17V9.5L10 4l7 5.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="7.5" y="12" width="5" height="5" rx="0.75" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  if (type === 'room') {
    return (
      <svg {...props}>
        <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10h16" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 10V7a2 2 0 0 1 4 0v3" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  if (type === 'addon') {
    return (
      <svg {...props}>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6.5v7M6.5 10h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'transfer') {
    return (
      <svg {...props}>
        <rect x="1.5" y="7" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="15" r="1.5" fill="currentColor" />
        <circle cx="11" cy="15" r="1.5" fill="currentColor" />
        <path d="M15.5 11h2a1 1 0 0 1 .9 1.4l-1 2.1H15.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M1.5 10h14" stroke="currentColor" strokeWidth="1.25" />
        <path d="M5.5 7V4.5A1.5 1.5 0 0 1 7 3h4a1.5 1.5 0 0 1 1.5 1.5V7" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  // package
  return (
    <svg {...props}>
      <path d="M10 2L18 6v8l-8 4-8-4V6l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 6l8 4 8-4M10 10v8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
};

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  course: 'Course',
  accommodation: 'Accommodation',
  room: 'Room',
  addon: 'Add-on',
  transfer: 'Transfer',
  package: 'Package',
};
