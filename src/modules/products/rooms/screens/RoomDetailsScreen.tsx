import { AppAsyncState, AppKeyValueList } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { useRoomDetailsScreen } from '@/modules/products/rooms/hooks/useRoomDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';
import { useAccommodationRoomTypesQuery } from '@/shared/queries/useAccommodationRoomTypesQuery';
import { useAccommodationBathroomTypesQuery } from '@/shared/queries/useAccommodationBathroomTypesQuery';
import { useAccommodationBoardTypesQuery } from '@/shared/queries/useAccommodationBoardTypesQuery';
import { useAccommodationRoomGradesQuery } from '@/shared/queries/useAccommodationRoomGradesQuery';
import { useAccountCategoriesQuery } from '@/shared/queries/useAccountCategoriesQuery';
import { useProductCategoriesQuery } from '@/shared/queries/useProductCategoriesQuery';

function findName(items: { id: number; name: string }[] | undefined, id: number | null | undefined): string {
  if (!items || id == null) return '—';
  return items.find((x) => x.id === id)?.name ?? String(id);
}

export const RoomDetailsScreen = () => {
  const page = useRoomDetailsScreen();
  const { divisionId } = useDivisionContext();

  const unitTypesQuery = useUnitTypesQuery();
  const roomTypesQuery = useAccommodationRoomTypesQuery();
  const bathroomTypesQuery = useAccommodationBathroomTypesQuery();
  const boardTypesQuery = useAccommodationBoardTypesQuery();
  const roomGradesQuery = useAccommodationRoomGradesQuery();
  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);

  if (page.isLoading) {
    return (
      <section className="app-page product-details-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <div className="app-grid app-grid--dense product-details-page__loading">
          {Array.from({ length: 4 }, (_, i) => <div key={i} className="app-skeleton product-details-page__skeleton" />)}
        </div>
      </section>
    );
  }

  if (page.errorMessage || page.details === null) {
    return (
      <section className="app-page product-details-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <AppAsyncState title="Could not load room" text={page.errorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  const { details } = page;
  const unitTypeName = findName(unitTypesQuery.data, details.unitTypeId);
  const roomTypeName = findName(roomTypesQuery.data, details.roomDetails.roomTypeId);
  const boardTypeName = findName(boardTypesQuery.data, details.roomDetails.boardTypeId);
  const bathroomTypeName = findName(bathroomTypesQuery.data, details.roomDetails.bathroomTypeId);
  const roomGradeName = findName(roomGradesQuery.data, details.roomDetails.roomGradeId);
  const accountCatName = findName(accountCatsQuery.data, details.accountCategoryId);
  const productCatName = findName(productCatsQuery.data, details.productCategoryId);

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="room"
        name={details.name}
        isActive={details.isActive}
        onBack={page.handleBackToAccommodation}
        onEdit={page.openEditPage}
        backLabel="Back to accommodation"
      />
      <div className="app-split product-details-page__layout">
        <div className="app-stack app-stack--lg">
          <AppSectionCard title="Basics" description="Name, pricing unit, and availability.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Priced per</dt>
                  <dd className="app-key-value-list__value">{unitTypeName}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Occupies room</dt>
                  <dd className="app-key-value-list__value">{details.occupyRoom ? 'Yes' : 'No'}</dd>
                </div>
              </AppKeyValueList>
            </div>
          </AppSectionCard>

          <AppSectionCard title="Room details" description="Physical configuration of the room.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Room type</dt>
                  <dd className="app-key-value-list__value">{roomTypeName}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Board type</dt>
                  <dd className="app-key-value-list__value">{boardTypeName}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Bathroom type</dt>
                  <dd className="app-key-value-list__value">{bathroomTypeName}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Room grade</dt>
                  <dd className="app-key-value-list__value">{roomGradeName}</dd>
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

          {(details.generalLedgerCode || details.costCentreCode || details.closurePolicy) ? (
            <AppSectionCard title="Finance & availability">
              <div className="product-details-sections__grid">
                {details.generalLedgerCode ? (
                  <AppKeyValueList>
                    <div className="app-key-value-list__row">
                      <dt className="app-key-value-list__label">GL code</dt>
                      <dd className="app-key-value-list__value">{details.generalLedgerCode}</dd>
                    </div>
                  </AppKeyValueList>
                ) : null}
                {details.costCentreCode ? (
                  <AppKeyValueList>
                    <div className="app-key-value-list__row">
                      <dt className="app-key-value-list__label">Cost centre</dt>
                      <dd className="app-key-value-list__value">{details.costCentreCode}</dd>
                    </div>
                  </AppKeyValueList>
                ) : null}
                {details.closurePolicy ? (
                  <AppKeyValueList>
                    <div className="app-key-value-list__row">
                      <dt className="app-key-value-list__label">Closure date</dt>
                      <dd className="app-key-value-list__value">
                        {new Date(details.closurePolicy).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </dd>
                    </div>
                  </AppKeyValueList>
                ) : null}
              </div>
            </AppSectionCard>
          ) : null}
        </div>
        <ProductReadonlySummary title="Room summary" isActive={details.isActive} audit={details} />
      </div>
    </section>
  );
};
