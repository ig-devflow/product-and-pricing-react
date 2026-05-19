import { ContentFormatDto } from '@/modules/divisions/api/dto';
import { mapContentFormatToDto } from '@/modules/divisions/model/content-format.mappers';
import { ContentFormat } from '@/modules/divisions/model/content-format';
import type {
  AddressRequestDto,
  CentreBankDetailsRequestDto,
  CentreContactInfoRequestDto,
  CentreContactRequestDto,
  CentreLegalInfoRequestDto,
  CentreOperationalRatiosRequestDto,
  CreateCentreRequestDto,
  ImageFileRequestDto,
  TextContentRequestDto,
  UpdateCentreRequestDto,
} from '../api/dto';
import type { CentreImageFile } from './types';
import type {
  CentreAddressFormValue,
  CentreContactFormValue,
  CentreFormValues,
  CentreTextContentFormValue,
} from './form.types';

function toNullableString(value: string): string | null {
  const v = value.trim();
  return v ? v : null;
}

function toNullableNumber(value: string): number | null {
  const v = value.trim();
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function mapAddressToDto(addr: CentreAddressFormValue): AddressRequestDto {
  return {
    street: toNullableString(addr.street),
    district: toNullableString(addr.district),
    city: toNullableString(addr.city),
    postalCode: toNullableString(addr.postalCode),
    countryId: toNullableNumber(addr.countryId),
  };
}

function mapImageFileToDto(img: CentreImageFile | null): ImageFileRequestDto {
  if (!img?.base64) return { data: null, contentType: null, fileName: null };
  return {
    data: img.base64,
    contentType: toNullableString(img.contentType),
    fileName: toNullableString(img.fileName),
  };
}

function mapContactInfoToDto(step2: CentreFormValues['step2']): CentreContactInfoRequestDto {
  return {
    generalEmail: toNullableString(step2.generalEmail),
    accommodationEmail: toNullableString(step2.accommodationEmail),
    telephone: toNullableString(step2.telephone),
    emergencyTelephone: toNullableString(step2.emergencyTelephone),
    transferEmergencyTelephone: toNullableString(step2.transferEmergencyTelephone),
    brandColor: toNullableString(step2.brandColor),
    contactAddress: mapAddressToDto(step2.contactAddress),
    logoImage: mapImageFileToDto(step2.logoImage),
  };
}

function mapLegalInfoToDto(step3: CentreFormValues['step3']): CentreLegalInfoRequestDto {
  return {
    schoolSponsorshipNumber: toNullableString(step3.schoolSponsorshipNumber),
    vatNumber: toNullableString(step3.vatNumber),
    registrationNumber: toNullableString(step3.registrationNumber),
    vatExemptionNumber: toNullableString(step3.vatExemptionNumber),
    chequePayableTo: toNullableString(step3.chequePayableTo),
  };
}

function mapOperationalRatiosToDto(
  step3: CentreFormValues['step3'],
): CentreOperationalRatiosRequestDto {
  return {
    guarantees: toNullableNumber(step3.guarantees),
    individualsRatio: toNullableNumber(step3.individualsRatio),
    staffingRatio: toNullableNumber(step3.staffingRatio),
    emptyBeds: toNullableNumber(step3.emptyBeds),
  };
}

function mapBankDetailsToDto(step4: CentreFormValues['step4']): CentreBankDetailsRequestDto {
  return {
    beneficiaryName: step4.beneficiaryName.trim(),
    accountNumber: step4.accountNumber.trim(),
    bankName: step4.bankName.trim(),
    iban: toNullableString(step4.iban),
    swiftCode: toNullableString(step4.swiftCode),
    branchCode: toNullableString(step4.branchCode),
    abaRoutingNo: toNullableString(step4.abaRoutingNo),
    achAba: toNullableString(step4.achAba),
    intermediaryBankName: toNullableString(step4.intermediaryBankName),
    intermediarySwiftCode: toNullableString(step4.intermediarySwiftCode),
    bankAddress: mapAddressToDto(step4.bankAddress),
    beneficiaryBankAddress: mapAddressToDto(step4.beneficiaryBankAddress),
    intermediaryBankAddress: mapAddressToDto(step4.intermediaryBankAddress),
  };
}

function mapContactToDto(c: CentreContactFormValue): CentreContactRequestDto {
  return {
    contactType: c.contactType === '' ? 0 : Number(c.contactType),
    name: c.name.trim(),
    email: toNullableString(c.email),
    signatureImage: mapImageFileToDto(c.signatureImage),
  };
}

function mapTextContentToDto(t: CentreTextContentFormValue): TextContentRequestDto {
  const content = toNullableString(t.content);
  return {
    contentTemplateId: Number(t.contentTemplateId),
    audienceId: toNullableNumber(t.audienceId),
    content,
    format: content ? mapContentFormatToDto(t.format) : ContentFormatDto.None,
  };
}

function buildCentreRequestBase(values: CentreFormValues) {
  return {
    name: values.step1.name.trim(),
    code: values.step1.code.trim(),
    currencyId: Number(values.step1.currencyId),
    printFormat: values.step1.printFormat === '' ? 0 : Number(values.step1.printFormat),
    isActive: values.step1.isActive,
    isPhysicalCentre: values.step1.isPhysicalCentre,
    contactInfo: mapContactInfoToDto(values.step2),
    legalInfo: mapLegalInfoToDto(values.step3),
    operationalRatios: mapOperationalRatiosToDto(values.step3),
    bankDetails: mapBankDetailsToDto(values.step4),
    contacts: values.step5.contacts
      .filter((c) => c.contactType !== '' && c.name.trim())
      .map(mapContactToDto),
    texts: values.step5.texts
      .filter((t) => t.contentTemplateId)
      .map((t) => mapTextContentToDto({
        ...t,
        format: t.format === ContentFormat.None ? ContentFormat.PlainText : t.format,
      })),
  };
}

export function mapFormValuesToCreateDto(values: CentreFormValues): CreateCentreRequestDto {
  return buildCentreRequestBase(values);
}

export function mapFormValuesToUpdateDto(
  values: CentreFormValues,
  centreId: number,
  version: string,
): UpdateCentreRequestDto {
  return {
    ...buildCentreRequestBase(values),
    id: centreId,
    version,
  };
}
