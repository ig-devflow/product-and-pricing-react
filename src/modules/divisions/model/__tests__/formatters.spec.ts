import { describe, expect, it } from 'vitest'
import { buildDivisionAddressText } from '../formatters'

describe('division formatters', () => {
  it('prefers the resolved country name over the stored country code', () => {
    const addressText = buildDivisionAddressText(
      {
        id: 7,
        line1: 'Marguerite Mangion Street',
        line2: 'St Julians',
        line3: '',
        line4: '',
        countryIsoCode: 'MT',
      },
      {
        countryName: 'Malta',
      },
    )

    expect(addressText).toBe('Marguerite Mangion Street, St Julians, Malta')
  })
})
