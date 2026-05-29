import type { CreateAddOnRequestDto, UpdateAddOnRequestDto } from '@/modules/products/addons/api/dto';
import { AddOnType } from '@/modules/products/addons/api/dto';
import type { AddOnFormValues } from './form.types';

function toOptionalInt(value: number | ''): number | null {
  return typeof value === 'number' ? value : null;
}

export function mapAddOnFormValuesToCreateDto(values: AddOnFormValues): CreateAddOnRequestDto {
  return {
    name: values.name.trim(),
    unitTypeId: values.unitTypeId ?? 0,
    addOnType: values.addOnType ?? AddOnType.Generic,
    isActive: values.isActive,
    accountCategoryId: values.accountCategoryId ?? 0,
    productCategoryId: values.productCategoryId ?? 0,
    ageFrom: toOptionalInt(values.ageFrom),
    ageTo: toOptionalInt(values.ageTo),
    oneToOneLessonsPerWeek: toOptionalInt(values.oneToOneLessonsPerWeek),
    generalLedgerCode: values.generalLedgerCode.trim() || null,
    costCentreCode: values.costCentreCode.trim() || null,
    closurePolicy: values.closurePolicy.trim() || null,
  };
}

export function mapAddOnFormValuesToUpdateDto(
  values: AddOnFormValues,
  version: string,
): UpdateAddOnRequestDto {
  return { ...mapAddOnFormValuesToCreateDto(values), version };
}
