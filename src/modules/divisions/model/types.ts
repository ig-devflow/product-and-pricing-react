import type { ContentFormat } from './content-format'

export interface DivisionAddress {
  id: number | null
  line1: string
  line2: string
  line3: string
  line4: string
  countryIsoCode: string
}

export interface DivisionBanner {
  imageBase64: string
  contentType: string
  fileName: string
}

export interface DivisionReportText {
  id: number
  reportTextId: number
  divisionId: number | null
  centreId: number | null
  content: string
  format: ContentFormat
  createdOn: string
  createdBy: string
  lastModifiedOn: string
  lastModifiedBy: string
  isDeleted: boolean
}

export interface DivisionListItem {
  id: number
  name: string
  isActive: boolean
  websiteUrl: string
  websiteDisplayUrl: string
  address: DivisionAddress
  addressText: string
  banner: DivisionBanner | null
  createdBy: string
  lastModifiedBy: string
}

export interface DivisionDetails {
  id: number
  name: string
  isActive: boolean
  websiteUrl: string
  termsAndConditions: string
  groupsPaymentTerms: string
  visaLetterNote: string
  visaLetterNoteFormat: ContentFormat
  address: DivisionAddress
  accreditationBanner: DivisionBanner | null
  createdOn: string
  createdBy: string
  lastModifiedOn: string
  lastModifiedBy: string
  years: number[]
  headOfficeEmailAddress: string
  headOfficeTelephoneNo: string
  reportTexts: DivisionReportText[]
}
