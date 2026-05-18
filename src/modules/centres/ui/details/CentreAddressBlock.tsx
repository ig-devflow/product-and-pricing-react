import type { CentreAddress } from '@/modules/centres/model/types';
import { isAddressEmpty } from '@/modules/centres/model/helpers';

export interface CentreAddressBlockProps {
  label: string;
  address: CentreAddress | null | undefined;
  countryName?: string;
}

export const CentreAddressBlock = ({ label, address, countryName }: CentreAddressBlockProps) => {
  if (isAddressEmpty(address)) {
    return (
      <div className="address-card">
        <span className="address-card__label">{label}</span>
        <span className="address-card__empty">Address not provided</span>
      </div>
    );
  }

  return (
    <div className="address-card">
      <span className="address-card__label">{label}</span>
      {address?.street ? <span>{address.street}</span> : null}
      {address?.district ? <span>{address.district}</span> : null}
      {address?.city || address?.postalCode ? (
        <span>{[address.postalCode, address.city].filter(Boolean).join(' ')}</span>
      ) : null}
      {countryName ? <span>{countryName}</span> : null}
    </div>
  );
};
