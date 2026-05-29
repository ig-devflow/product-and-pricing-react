import type { To } from 'react-router';
import { AppPill } from '@/shared/ui/data-display';
import { AppButtonLink, AppSurface } from '@/shared/ui/primitives';
import { ProductTypeIcon, PRODUCT_TYPE_LABELS, type ProductType } from './ProductTypeIcon';
import { buildEditorDisplayText } from '../model/formatters';

export interface ProductCardFact {
  key: string;
  label: string;
  value: string;
}

export interface ProductCardAudit {
  createdAtText: string;
  createdByName: string;
  updatedAtText: string;
  updatedByName: string;
}

export interface ProductCardProps {
  productType: ProductType;
  name: string;
  isActive: boolean;
  facts: ProductCardFact[];
  audit: ProductCardAudit;
  detailsHref: To;
  editHref: To;
}

export const ProductCard = ({
  productType,
  name,
  isActive,
  facts,
  audit,
  detailsHref,
  editHref,
}: ProductCardProps) => {
  const createdText = audit.createdAtText
    ? `${audit.createdAtText} by ${buildEditorDisplayText(audit.createdByName)}`
    : `Unknown date by ${buildEditorDisplayText(audit.createdByName)}`;
  const updatedText = audit.updatedAtText
    ? `${audit.updatedAtText} by ${buildEditorDisplayText(audit.updatedByName)}`
    : 'Not updated yet';

  return (
    <AppSurface className="app-card product-card" as="article" padding="none">
      <header className="product-card__header">
        <div className={`product-card__icon product-card__icon--${productType}`} aria-hidden="true">
          <ProductTypeIcon type={productType} size={22} />
        </div>
        <AppPill
          className="product-card__status"
          variant={isActive ? 'success' : 'neutral'}
        >
          {isActive ? 'Active' : 'Inactive'}
        </AppPill>
      </header>

      <div className="product-card__body">
        <p className="product-card__eyebrow">{PRODUCT_TYPE_LABELS[productType]}</p>
        <h2 className="product-card__title">{name}</h2>

        {facts.length > 0 && (
          <div className="product-card__facts" aria-label="Quick facts">
            {facts.map((fact) => (
              <div key={fact.key} className="product-card__fact">
                <span className="product-card__fact-label">{fact.label}</span>
                <span className="product-card__fact-value">{fact.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="product-card__audit">
          <div className="product-card__audit-item">
            <span>Created</span>
            <strong>{createdText}</strong>
          </div>
          <div className="product-card__audit-item">
            <span>Updated</span>
            <strong className={!audit.updatedAtText ? 'product-card__audit-muted' : undefined}>
              {updatedText}
            </strong>
          </div>
        </div>
      </div>

      <footer className="product-card__actions">
        <AppButtonLink to={detailsHref} variant="ghost" size="sm">
          Open details
        </AppButtonLink>
        <AppButtonLink to={editHref} variant="primary" size="sm">
          Edit
        </AppButtonLink>
      </footer>
    </AppSurface>
  );
};
