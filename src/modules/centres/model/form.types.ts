import type { ContentFormat } from '@/modules/divisions/model/content-format';
import type { CentreContactType, CentreImageFile } from './types';

export interface CentreAddressFormValue {
  street: string;
  district: string;
  city: string;
  postalCode: string;
  countryId: string;
}

export interface CentreTextContentFormValue {
  textId: number | null;
  contentTemplateId: string;
  audienceId: string;
  content: string;
  format: ContentFormat;
}

export interface CentreContactFormValue {
  contactType: CentreContactType | '';
  name: string;
  email: string;
  signatureImage: CentreImageFile | null;
}

export interface CentreStep1Values {
  name: string;
  code: string;
  currencyId: string;
  printFormatId: number | '';
  isActive: boolean;
  isPhysicalCentre: boolean;
}

export interface CentreStep2Values {
  generalEmail: string;
  accommodationEmail: string;
  telephone: string;
  emergencyTelephone: string;
  transferEmergencyTelephone: string;
  brandColor: string;
  contactAddress: CentreAddressFormValue;
  logoImage: CentreImageFile | null;
}

export interface CentreStep3Values {
  schoolSponsorshipNumber: string;
  vatNumber: string;
  registrationNumber: string;
  vatExemptionNumber: string;
  chequePayableTo: string;
  guarantees: string;
  individualsRatio: string;
  staffingRatio: string;
  emptyBeds: string;
}

export interface CentreStep4Values {
  beneficiaryName: string;
  accountNumber: string;
  bankName: string;
  iban: string;
  swiftCode: string;
  branchCode: string;
  abaRoutingNo: string;
  achAba: string;
  intermediaryBankName: string;
  intermediarySwiftCode: string;
  bankAddress: CentreAddressFormValue;
  beneficiaryBankAddress: CentreAddressFormValue;
  intermediaryBankAddress: CentreAddressFormValue;
}

export interface CentreStep5Values {
  contacts: CentreContactFormValue[];
  texts: CentreTextContentFormValue[];
}

export interface CentreFormValues {
  step1: CentreStep1Values;
  step2: CentreStep2Values;
  step3: CentreStep3Values;
  step4: CentreStep4Values;
  step5: CentreStep5Values;
}
