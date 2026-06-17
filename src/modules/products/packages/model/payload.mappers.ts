import type {
  CreatePackageRequestDto,
  UpdatePackageRequestDto,
} from '@/modules/products/packages/api/dto';
import type { PackageFormValues } from './form.types';

function toOptionalInt(value: number | ''): number | null {
  return typeof value === 'number' ? value : null;
}

export function mapPackageFormValuesToCreateDto(
  values: PackageFormValues,
): CreatePackageRequestDto {
  return {
    name: values.name.trim(),
    unitTypeId: values.unitTypeId ?? 0,
    isActive: values.isActive,
    description: values.description.trim() || null,
    commission: typeof values.commission === 'number' ? values.commission : 0,
    ageFrom: toOptionalInt(values.ageFrom),
    ageTo: toOptionalInt(values.ageTo),
    minimumWeeks: toOptionalInt(values.minimumWeeks),
    accountCategoryId: values.accountCategoryId ?? 0,
    productCategoryId: values.productCategoryId ?? 0,
    generalLedgerCode: values.generalLedgerCode.trim() || null,
    costCentreCode: values.costCentreCode.trim() || null,
    closurePolicy: values.closurePolicy.trim() || null,
    items: values.items,
  };
}

export function mapPackageFormValuesToUpdateDto(
  values: PackageFormValues,
  version: string,
): UpdatePackageRequestDto {
  return { ...mapPackageFormValuesToCreateDto(values), version };
}
