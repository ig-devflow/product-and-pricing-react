import { AppKeyValueList } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { AddOnDetails } from '@/modules/products/addons/model/types';
import { AddOnType } from '@/modules/products/addons/api/dto';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';
import { useAccountCategoriesQuery } from '@/shared/queries/useAccountCategoriesQuery';
import { useProductCategoriesQuery } from '@/shared/queries/useProductCategoriesQuery';

const ADD_ON_TYPE_LABELS: Record<AddOnType, string> = {
  [AddOnType.OneToOneCourse]: 'One-to-one course',
  [AddOnType.Exam]: 'Exam',
  [AddOnType.Activity]: 'Activity',
  [AddOnType.Insurance]: 'Insurance',
  [AddOnType.Generic]: 'Generic',
};

function findName(items: { id: number; name: string }[] | undefined, id: number | null | undefined): string {
  if (!items || id == null) return '—';
  return items.find((x) => x.id === id)?.name ?? String(id);
}

export interface AddOnDetailsSectionsProps {
  addon: AddOnDetails;
}

export const AddOnDetailsSections = ({ addon }: AddOnDetailsSectionsProps) => {
  const { divisionName, divisionId } = useDivisionContext();
  const unitTypesQuery = useUnitTypesQuery();
  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);

  const unitTypeName = findName(unitTypesQuery.data, addon.unitTypeId);
  const accountCatName = findName(accountCatsQuery.data, addon.accountCategoryId);
  const productCatName = findName(productCatsQuery.data, addon.productCategoryId);
  const addOnTypeName = ADD_ON_TYPE_LABELS[addon.addOnType] ?? String(addon.addOnType);

  return (
    <div className="app-stack app-stack--lg">
      <AppSectionCard title="Basics" description="Name, type, and current availability status.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Add-on type</dt>
              <dd className="app-key-value-list__value">{addOnTypeName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Division</dt>
              <dd className="app-key-value-list__value">{divisionName}</dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      <AppSectionCard title="Classification" description="Pricing unit and student age range.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Priced per</dt>
              <dd className="app-key-value-list__value">{unitTypeName}</dd>
            </div>
          </AppKeyValueList>
          {addon.oneToOneLessonsPerWeek != null ? (
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">1-to-1 lessons/week</dt>
                <dd className="app-key-value-list__value">{addon.oneToOneLessonsPerWeek}</dd>
              </div>
            </AppKeyValueList>
          ) : null}
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Age range</dt>
              <dd className="app-key-value-list__value">
                {addon.ageFrom != null && addon.ageTo != null
                  ? `${addon.ageFrom}–${addon.ageTo}`
                  : addon.ageFrom != null
                    ? `${addon.ageFrom}+`
                    : '—'}
              </dd>
            </div>
          </AppKeyValueList>
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

      {(addon.generalLedgerCode || addon.costCentreCode || addon.closurePolicy) ? (
        <AppSectionCard title="Finance & availability">
          <div className="product-details-sections__grid">
            {addon.generalLedgerCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">GL code</dt>
                  <dd className="app-key-value-list__value">{addon.generalLedgerCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {addon.costCentreCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Cost centre</dt>
                  <dd className="app-key-value-list__value">{addon.costCentreCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {addon.closurePolicy ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Closure date</dt>
                  <dd className="app-key-value-list__value">
                    {new Date(addon.closurePolicy).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
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
