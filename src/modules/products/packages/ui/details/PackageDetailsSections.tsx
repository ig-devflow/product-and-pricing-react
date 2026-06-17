import { AppKeyValueList } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { PackageDetails } from '@/modules/products/packages/model/types';
import { ProductKind } from '@/modules/products/packages/api/dto';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';
import { useAccountCategoriesQuery } from '@/shared/queries/useAccountCategoriesQuery';
import { useProductCategoriesQuery } from '@/shared/queries/useProductCategoriesQuery';

const PRODUCT_KIND_LABELS: Record<number, string> = {
  [ProductKind.Course]: 'Course',
  [ProductKind.AccommodationRoom]: 'Room',
  [ProductKind.AddOn]: 'Add-on',
  [ProductKind.Transfer]: 'Transfer',
};

function findName(items: { id: number; name: string }[] | undefined, id: number | null | undefined): string {
  if (!items || id == null) return '—';
  return items.find((x) => x.id === id)?.name ?? String(id);
}

export interface PackageDetailsSectionsProps {
  pkg: PackageDetails;
}

export const PackageDetailsSections = ({ pkg }: PackageDetailsSectionsProps) => {
  const { divisionName, divisionId } = useDivisionContext();
  const unitTypesQuery = useUnitTypesQuery();
  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);

  const unitTypeName = findName(unitTypesQuery.data, pkg.unitTypeId);
  const accountCatName = findName(accountCatsQuery.data, pkg.accountCategoryId);
  const productCatName = findName(productCatsQuery.data, pkg.productCategoryId);

  return (
    <div className="app-stack app-stack--lg">
      <AppSectionCard title="Basics" description="Package name and current availability.">
        <div className="product-details-sections__grid">
          {pkg.description ? (
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Description</dt>
                <dd className="app-key-value-list__value">{pkg.description}</dd>
              </div>
            </AppKeyValueList>
          ) : null}
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Division</dt>
              <dd className="app-key-value-list__value">{divisionName}</dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      <AppSectionCard title="Classification" description="Pricing unit, commission, and booking constraints.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Priced per</dt>
              <dd className="app-key-value-list__value">{unitTypeName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Commission</dt>
              <dd className="app-key-value-list__value">{pkg.commission}%</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Age range</dt>
              <dd className="app-key-value-list__value">
                {pkg.ageFrom != null && pkg.ageTo != null
                  ? `${pkg.ageFrom}–${pkg.ageTo}`
                  : pkg.ageFrom != null
                    ? `${pkg.ageFrom}+`
                    : '—'}
              </dd>
            </div>
          </AppKeyValueList>
          {pkg.minimumWeeks != null ? (
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Minimum weeks</dt>
                <dd className="app-key-value-list__value">{pkg.minimumWeeks}</dd>
              </div>
            </AppKeyValueList>
          ) : null}
        </div>
      </AppSectionCard>

      <AppSectionCard title="Components" description="Products bundled in this package.">
        <div className="product-details-sections__grid">
          {pkg.items.length === 0 ? (
            <p style={{ margin: 0, color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
              No components.
            </p>
          ) : (
            pkg.items.map((item, i) => (
              <AppKeyValueList key={i}>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">
                    {PRODUCT_KIND_LABELS[item.productKind] ?? `Kind ${item.productKind}`}
                  </dt>
                  <dd className="app-key-value-list__value">ID: {item.productId}</dd>
                </div>
              </AppKeyValueList>
            ))
          )}
        </div>
      </AppSectionCard>

      <AppSectionCard title="Categorisation" description="Product and account categories.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Product category</dt>
              <dd className="app-key-value-list__value">{productCatName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Account category</dt>
              <dd className="app-key-value-list__value">{accountCatName}</dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      {(pkg.generalLedgerCode || pkg.costCentreCode || pkg.closurePolicy) ? (
        <AppSectionCard title="Finance & availability">
          <div className="product-details-sections__grid">
            {pkg.generalLedgerCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">GL code</dt>
                  <dd className="app-key-value-list__value">{pkg.generalLedgerCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {pkg.costCentreCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Cost centre</dt>
                  <dd className="app-key-value-list__value">{pkg.costCentreCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {pkg.closurePolicy ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Closure date</dt>
                  <dd className="app-key-value-list__value">
                    {new Date(pkg.closurePolicy).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </dd>
                </div>
              </AppKeyValueList>
            ) : null}
          </div>
        </AppSectionCard>
      ) : null}
    </div>
  );
};
