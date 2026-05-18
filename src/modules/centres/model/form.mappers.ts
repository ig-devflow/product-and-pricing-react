import { ContentFormat } from '@/modules/divisions/model/content-format';
import type { CentreAddress, CentreDetails, CentreImageFile } from './types';
import { CentreContactType, PrintFormat } from './types';
import type {
  CentreAddressFormValue,
  CentreContactFormValue,
  CentreFormValues,
  CentreStep1Values,
  CentreStep2Values,
  CentreStep3Values,
  CentreStep4Values,
  CentreStep5Values,
  CentreTextContentFormValue,
} from './form.types';

function emptyAddress(): CentreAddressFormValue {
  return { street: '', district: '', city: '', postalCode: '', countryId: '' };
}

function cloneAddress(addr: CentreAddress): CentreAddressFormValue {
  return {
    street: addr.street,
    district: addr.district,
    city: addr.city,
    postalCode: addr.postalCode,
    countryId: addr.countryId ? String(addr.countryId) : '',
  };
}

function cloneImage(img: CentreImageFile | null): CentreImageFile | null {
  if (!img) return null;
  return { base64: img.base64, contentType: img.contentType, fileName: img.fileName };
}

export function createEmptyCentreFormValues(): CentreFormValues {
  return {
    step1: {
      name: '',
      code: '',
      currencyId: '',
      printFormat: '',
      isActive: true,
      isPhysicalCentre: true,
    },
    step2: {
      generalEmail: '',
      accommodationEmail: '',
      telephone: '',
      emergencyTelephone: '',
      transferEmergencyTelephone: '',
      brandColor: '',
      contactAddress: emptyAddress(),
      logoImage: null,
    },
    step3: {
      schoolSponsorshipNumber: '',
      vatNumber: '',
      registrationNumber: '',
      vatExemptionNumber: '',
      chequePayableTo: '',
      guarantees: '',
      individualsRatio: '',
      staffingRatio: '',
      emptyBeds: '',
    },
    step4: {
      beneficiaryName: '',
      accountNumber: '',
      bankName: '',
      iban: '',
      swiftCode: '',
      branchCode: '',
      abaRoutingNo: '',
      achAba: '',
      intermediaryBankName: '',
      intermediarySwiftCode: '',
      bankAddress: emptyAddress(),
      beneficiaryBankAddress: emptyAddress(),
      intermediaryBankAddress: emptyAddress(),
    },
    step5: {
      contacts: [],
      texts: [],
    },
  };
}

export function createEmptyContactFormValue(): CentreContactFormValue {
  return {
    contactType: '',
    name: '',
    email: '',
    signatureImage: null,
  };
}

export function createEmptyTextContentFormValue(): CentreTextContentFormValue {
  return {
    textId: null,
    contentTemplateId: '',
    audienceId: '',
    content: '',
    format: ContentFormat.PlainText,
  };
}

export function mapCentreDetailsToFormValues(details: CentreDetails): CentreFormValues {
  const step1: CentreStep1Values = {
    name: details.name,
    code: details.code,
    currencyId: details.currencyId ? String(details.currencyId) : '',
    printFormat: details.printFormat !== PrintFormat.None ? details.printFormat : '',
    isActive: details.isActive,
    isPhysicalCentre: details.isPhysicalCentre,
  };

  const step2: CentreStep2Values = {
    generalEmail: details.contactInfo.generalEmail,
    accommodationEmail: details.contactInfo.accommodationEmail,
    telephone: details.contactInfo.telephone,
    emergencyTelephone: details.contactInfo.emergencyTelephone,
    transferEmergencyTelephone: details.contactInfo.transferEmergencyTelephone,
    brandColor: details.contactInfo.brandColor,
    contactAddress: cloneAddress(details.contactInfo.contactAddress),
    logoImage: cloneImage(details.contactInfo.logoImage),
  };

  const step3: CentreStep3Values = {
    schoolSponsorshipNumber: details.legalInfo.schoolSponsorshipNumber,
    vatNumber: details.legalInfo.vatNumber,
    registrationNumber: details.legalInfo.registrationNumber,
    vatExemptionNumber: details.legalInfo.vatExemptionNumber,
    chequePayableTo: details.legalInfo.chequePayableTo,
    guarantees: details.operationalRatios.guarantees != null ? String(details.operationalRatios.guarantees) : '',
    individualsRatio: details.operationalRatios.individualsRatio != null ? String(details.operationalRatios.individualsRatio) : '',
    staffingRatio: details.operationalRatios.staffingRatio != null ? String(details.operationalRatios.staffingRatio) : '',
    emptyBeds: details.operationalRatios.emptyBeds != null ? String(details.operationalRatios.emptyBeds) : '',
  };

  const step4: CentreStep4Values = {
    beneficiaryName: details.bankDetails.beneficiaryName,
    accountNumber: details.bankDetails.accountNumber,
    bankName: details.bankDetails.bankName,
    iban: details.bankDetails.iban,
    swiftCode: details.bankDetails.swiftCode,
    branchCode: details.bankDetails.branchCode,
    abaRoutingNo: details.bankDetails.abaRoutingNo,
    achAba: details.bankDetails.achAba,
    intermediaryBankName: details.bankDetails.intermediaryBankName,
    intermediarySwiftCode: details.bankDetails.intermediarySwiftCode,
    bankAddress: cloneAddress(details.bankDetails.bankAddress),
    beneficiaryBankAddress: cloneAddress(details.bankDetails.beneficiaryBankAddress),
    intermediaryBankAddress: cloneAddress(details.bankDetails.intermediaryBankAddress),
  };

  const step5: CentreStep5Values = {
    contacts: details.contacts.map((c) => ({
      contactType: c.contactType !== CentreContactType.None ? c.contactType : '',
      name: c.name,
      email: c.email,
      signatureImage: cloneImage(c.signatureImage),
    })),
    texts: details.texts.map((t) => ({
      textId: t.id,
      contentTemplateId: String(t.contentTemplateId),
      audienceId: t.audienceId ? String(t.audienceId) : '',
      content: t.content,
      format: t.format === ContentFormat.None ? ContentFormat.PlainText : t.format,
    })),
  };

  return { step1, step2, step3, step4, step5 };
}
