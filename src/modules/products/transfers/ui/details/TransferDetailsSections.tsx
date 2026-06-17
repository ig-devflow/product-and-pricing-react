import { AppKeyValueList } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { TransferDetails } from '@/modules/products/transfers/model/types';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';
import { useAccountCategoriesQuery } from '@/shared/queries/useAccountCategoriesQuery';
import { useProductCategoriesQuery } from '@/shared/queries/useProductCategoriesQuery';
import { useTransferTypesQuery } from '@/shared/queries/useTransferTypesQuery';
import { useTransferPortsQuery } from '@/shared/queries/useTransferPortsQuery';

function findName(items: { id: number; name: string }[] | undefined, id: number | null | undefined): string {
  if (!items || id == null) return '—';
  return items.find((x) => x.id === id)?.name ?? String(id);
}

export interface TransferDetailsSectionsProps {
  transfer: TransferDetails;
}

export const TransferDetailsSections = ({ transfer }: TransferDetailsSectionsProps) => {
  const { divisionName, divisionId } = useDivisionContext();
  const unitTypesQuery = useUnitTypesQuery();
  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);
  const transferTypesQuery = useTransferTypesQuery();
  const transferPortsQuery = useTransferPortsQuery();

  const unitTypeName = findName(unitTypesQuery.data, transfer.unitTypeId);
  const accountCatName = findName(accountCatsQuery.data, transfer.accountCategoryId);
  const productCatName = findName(productCatsQuery.data, transfer.productCategoryId);
  const transferTypeName = findName(transferTypesQuery.data, transfer.transferTypeId);
  const transferPortName = findName(transferPortsQuery.data, transfer.transferPortId);

  return (
    <div className="app-stack app-stack--lg">
      <AppSectionCard title="Basics" description="Name, type, port, and current availability status.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Transfer type</dt>
              <dd className="app-key-value-list__value">{transferTypeName}</dd>
            </div>
          </AppKeyValueList>
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Transfer port</dt>
              <dd className="app-key-value-list__value">{transferPortName}</dd>
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

      <AppSectionCard title="Classification" description="Pricing unit and transfer times.">
        <div className="product-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Priced per</dt>
              <dd className="app-key-value-list__value">{unitTypeName}</dd>
            </div>
          </AppKeyValueList>
          {transfer.timeFrom ? (
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Pickup time</dt>
                <dd className="app-key-value-list__value">{transfer.timeFrom}</dd>
              </div>
            </AppKeyValueList>
          ) : null}
          {transfer.timeTo ? (
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Drop-off time</dt>
                <dd className="app-key-value-list__value">{transfer.timeTo}</dd>
              </div>
            </AppKeyValueList>
          ) : null}
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

      {(transfer.generalLedgerCode || transfer.costCentreCode || transfer.closurePolicy) ? (
        <AppSectionCard title="Finance & availability">
          <div className="product-details-sections__grid">
            {transfer.generalLedgerCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">GL code</dt>
                  <dd className="app-key-value-list__value">{transfer.generalLedgerCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {transfer.costCentreCode ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Cost centre</dt>
                  <dd className="app-key-value-list__value">{transfer.costCentreCode}</dd>
                </div>
              </AppKeyValueList>
            ) : null}
            {transfer.closurePolicy ? (
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Closure date</dt>
                  <dd className="app-key-value-list__value">
                    {new Date(transfer.closurePolicy).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
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
