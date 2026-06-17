import { AppPill } from '@/shared/ui/data-display';
import { AppButton, AppSurface } from '@/shared/ui/primitives';
import { ProductTypeIcon, PRODUCT_TYPE_LABELS, type ProductType } from './ProductTypeIcon';

export interface ProductDetailsHeroProps {
  productType: ProductType;
  name: string;
  isActive: boolean;
  description?: string;
  onBack: () => void;
  onEdit: () => void;
  backLabel?: string;
}

export const ProductDetailsHero = ({
  productType,
  name,
  isActive,
  description,
  onBack,
  onEdit,
  backLabel,
}: ProductDetailsHeroProps) => (
  <AppSurface className="product-details-hero" padding="lg">
    <div className="product-details-hero__header">
      <div className="product-details-hero__identity">
        <div className={`product-details-hero__icon product-details-hero__icon--${productType}`}>
          <ProductTypeIcon type={productType} size={28} />
        </div>
        <div>
          <AppPill variant={isActive ? 'success' : 'neutral'}>
            {isActive ? `Active ${PRODUCT_TYPE_LABELS[productType].toLowerCase()}` : `Inactive ${PRODUCT_TYPE_LABELS[productType].toLowerCase()}`}
          </AppPill>
        </div>
      </div>

      <div className="product-details-hero__actions">
        <AppButton type="button" variant="ghost" onClick={onBack}>
          {backLabel ?? 'Back to list'}
        </AppButton>
        <AppButton type="button" variant="primary" onClick={onEdit}>
          Edit {PRODUCT_TYPE_LABELS[productType].toLowerCase()}
        </AppButton>
      </div>
    </div>

    <div className="app-stack app-stack--sm product-details-hero__copy">
      <h2 className="product-details-hero__title">{name}</h2>
      {description ? (
        <p className="product-details-hero__text">{description}</p>
      ) : null}
    </div>
  </AppSurface>
);
