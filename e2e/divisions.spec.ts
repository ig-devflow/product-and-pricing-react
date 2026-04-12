import { expect, test, type Locator, type Page, type Route } from '@playwright/test'

const sampleBannerBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9pQxWb8AAAAASUVORK5CYII='

function jsonResponse(route: Route, payload: unknown, status = 200) {
  return route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(payload),
  })
}

async function activate(locator: Locator) {
  await locator.focus()
  await locator.press('Enter')
}

function createDivisionSummary(id: number, name: string) {
  return {
    id,
    name,
    termsAndConditions: 'Terms',
    groupsPaymentTerms: 'Groups terms',
    isActive: true,
    websiteUrl: `https://${name.toLowerCase().replace(/\s+/g, '')}.example.com`,
    address: {
      id: 10 + id,
      line1: `${id} Main Street`,
      line2: 'Central',
      line3: 'Valletta',
      line4: 'VLT 1000',
      countryISOCode: 'MT',
    },
    accreditationBanner: {
      image: sampleBannerBase64,
      contentType: 'image/png',
      fileName: `${name.toLowerCase().replace(/\s+/g, '-')}.png`,
    },
    visaLetterNote: 'Visa note',
    visaLetterNoteFormat: 1,
    createdBy: 'lydiavella@gmail.com',
    lastModifiedBy: 'lydiavella@gmail.com',
  }
}

function createDivisionDetails(id: number, name: string) {
  const summary = createDivisionSummary(id, name)

  return {
    ...summary,
    createdOn: '2026-04-01T08:00:00Z',
    lastModifiedOn: '2026-04-02T09:30:00Z',
    years: [2026],
    headOfficeEmailAddress: 'hello@ecenglish.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    divisionReportTexts: [
      {
        id: 1,
        reportTextId: 100,
        divisionId: id,
        centreId: null,
        content: 'Terms',
        format: 1,
        createdOn: '2026-04-01T08:00:00Z',
        createdBy: 'lydiavella@gmail.com',
        lastModifiedOn: '2026-04-02T09:30:00Z',
        lastModifiedBy: 'lydiavella@gmail.com',
        isDeleted: false,
      },
    ],
  }
}

async function mockDivisionsApi(page: Page) {
  const list = [createDivisionSummary(7, 'EC Malta')]
  const details = new Map<number, ReturnType<typeof createDivisionDetails>>([
    [7, createDivisionDetails(7, 'EC Malta')],
  ])
  const createPayloads: Record<string, unknown>[] = []
  const updatePayloads: Record<string, unknown>[] = []
  const divisionByIdPath = /^\/api\/divisions\/(\d+)$/

  await page.route(/\/api\/divisions(?:\/.*)?$/, async (route) => {
    const request = route.request()
    const pathname = new URL(request.url()).pathname
    const method = request.method()
    const divisionByIdMatch = divisionByIdPath.exec(pathname)

    if (method === 'GET' && pathname === '/api/divisions') {
      return jsonResponse(route, list)
    }

    if (method === 'GET' && divisionByIdMatch) {
      const id = Number(divisionByIdMatch[1])
      return jsonResponse(
        route,
        details.get(id) ?? { message: 'Not found' },
        details.has(id) ? 200 : 404,
      )
    }

    if (method === 'PUT' && pathname === '/api/divisions/create') {
      const payload = request.postDataJSON() as Record<string, unknown>
      createPayloads.push(payload)

      const newId = 11
      list.unshift(createDivisionSummary(newId, String(payload.name ?? 'New division')))
      details.set(newId, {
        ...createDivisionDetails(newId, String(payload.name ?? 'New division')),
        name: String(payload.name ?? 'New division'),
        websiteUrl: String(payload.websiteUrl ?? 'https://new.example.com'),
        headOfficeEmailAddress: String(payload.headOfficeEmailAddress ?? 'hello@example.com'),
        headOfficeTelephoneNo: String(payload.headOfficeTelephoneNo ?? '+1 000 000 0000'),
        visaLetterNote: String(payload.visaLetterNote ?? ''),
        termsAndConditions: String(payload.termsAndConditions ?? ''),
        groupsPaymentTerms: String(payload.groupsPaymentTerms ?? ''),
      })

      return jsonResponse(route, {})
    }

    if (method === 'PUT' && divisionByIdMatch) {
      const id = Number(divisionByIdMatch[1])
      const payload = request.postDataJSON() as Record<string, unknown>
      updatePayloads.push(payload)
      const current = details.get(id)

      if (!current) {
        return jsonResponse(route, { message: 'Not found' }, 404)
      }

      details.set(id, {
        ...current,
        name: String(payload.name ?? current.name),
        websiteUrl: String(payload.websiteUrl ?? current.websiteUrl),
        termsAndConditions: String(payload.termsAndConditions ?? current.termsAndConditions),
        groupsPaymentTerms: String(payload.groupsPaymentTerms ?? current.groupsPaymentTerms),
        visaLetterNote: String(payload.visaLetterNote ?? current.visaLetterNote),
        headOfficeEmailAddress: String(
          payload.headOfficeEmailAddress ?? current.headOfficeEmailAddress,
        ),
        headOfficeTelephoneNo: String(
          payload.headOfficeTelephoneNo ?? current.headOfficeTelephoneNo,
        ),
        lastModifiedOn: '2026-04-07T10:00:00Z',
      })

      const existingIndex = list.findIndex((item) => item.id === id)
      if (existingIndex >= 0) {
        const existing = list[existingIndex]
        if (existing) {
          list.splice(existingIndex, 1, {
            ...existing,
            name: String(payload.name ?? current.name),
            websiteUrl: String(payload.websiteUrl ?? current.websiteUrl),
          })
        }
      }

      return jsonResponse(route, {})
    }

    return jsonResponse(route, { message: `Unhandled request: ${method} ${pathname}` }, 500)
  })

  return {
    createPayloads,
    updatePayloads,
  }
}

test('opens division details and saves edit changes', async ({ page }) => {
  const { updatePayloads } = await mockDivisionsApi(page)
  const header = page.getByRole('banner')

  await page.goto('/division-manager')
  await expect(page.getByRole('heading', { name: 'Division Manager' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'All divisions' })).toHaveCount(0)

  const openLink = page.getByRole('link', { name: 'Open' })
  await Promise.all([
    page.waitForURL(/\/division-manager\/7$/),
    activate(openLink),
  ])
  await expect(header.getByRole('link', { name: 'All divisions' })).toBeVisible()

  const editDivisionButton = page.getByRole('button', { name: 'Edit division' })
  await Promise.all([
    page.waitForURL(/\/division-manager\/7\/edit$/),
    activate(editDivisionButton),
  ])

  await page.getByLabel('Division name').fill('EC Malta Updated')
  await page
    .getByRole('textbox', { name: 'Visa letter note' })
    .fill('Updated visa note for testing')
  const saveChangesButton = page.getByRole('button', { name: 'Save changes' })
  await Promise.all([
    page.waitForURL(/\/division-manager\/7$/),
    activate(saveChangesButton),
  ])
  expect(updatePayloads).toHaveLength(1)
  expect(updatePayloads[0]?.name).toBe('EC Malta Updated')
  expect(updatePayloads[0]?.visaLetterNote).toBe('Updated visa note for testing')
})

test('creates a division and returns to the list', async ({ page }) => {
  const { createPayloads } = await mockDivisionsApi(page)
  const header = page.getByRole('banner')

  await page.goto('/division-manager/create')
  await expect(page.getByRole('heading', { name: 'Create division' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'All divisions' })).toBeVisible()

  await page.getByLabel('Division name').fill('EC Dublin')
  await page.getByLabel('Website URL').fill('https://dublin.example.com')
  await page.getByLabel('Head office email').fill('dublin@ecenglish.com')
  await page.getByLabel('Head office phone').fill('+353 1 234 5678')
  await page.getByLabel('Address line 1').fill('Grand Canal Quay')
  await page.getByLabel('Country ISO code').fill('ie')

  const visaFormatCombobox = page.getByRole('combobox', { name: 'Visa letter note format' })
  await visaFormatCombobox.focus()
  await visaFormatCombobox.press('ArrowDown')
  await visaFormatCombobox.press('ArrowDown')
  await visaFormatCombobox.press('Enter')
  await expect(visaFormatCombobox).toContainText('Plain text')

  await page.getByRole('textbox', { name: 'Visa letter note' }).fill('Visa note for Dublin')
  await page.getByLabel('Terms and conditions').fill('Division terms')
  await page.getByLabel('Groups payment terms').fill('Groups terms')

  const createDivisionButton = page.getByRole('button', { name: 'Create division' })

  await activate(createDivisionButton)

  await expect(page).toHaveURL(/\/division-manager$/)
  await expect(page.getByText('EC Dublin')).toBeVisible()
  expect(createPayloads).toHaveLength(1)
  expect(createPayloads[0]?.name).toBe('EC Dublin')
  expect(createPayloads[0]?.visaLetterNoteFormat).toBe(0)
  expect(createPayloads[0]?.headOfficeEmailAddress).toBe('dublin@ecenglish.com')
})

test('renders legacy products and pricing tabs on desktop and mobile', async ({
  browser,
  page,
}) => {
  await mockDivisionsApi(page)

  await page.goto('/division-manager')

  const header = page.getByRole('banner')
  const tabsNav = header.getByLabel('Products and Pricing sections')

  await expect(header.getByRole('button', { name: 'Menu' })).toHaveCount(0)
  await expect(tabsNav).toContainText('Pricelist')
  await expect(tabsNav).toContainText('Products')
  await expect(tabsNav).toContainText('Pricing Reference Data')
  await expect(tabsNav).toContainText('Calculator')
  await expect(header.getByRole('link', { name: 'Create division' })).toHaveCount(0)
  await expect(header.getByRole('link', { name: 'All divisions' })).toHaveCount(0)

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  })

  try {
    const mobilePage = await mobileContext.newPage()
    await mockDivisionsApi(mobilePage)
    await mobilePage.goto('/division-manager')

    const mobileHeader = mobilePage.getByRole('banner')
    const mobileTabsNav = mobileHeader.getByLabel('Products and Pricing sections')

    await expect(mobileHeader.getByRole('button', { name: 'Menu' })).toHaveCount(0)
    await expect(mobileTabsNav).toContainText('Pricelist')
    await expect(mobileTabsNav).toContainText('Pricing Reference Data')
  } finally {
    await mobileContext.close()
  }
})

test('uses all divisions as a contextual return link', async ({ page }) => {
  await mockDivisionsApi(page)
  const header = page.getByRole('banner')

  await page.goto('/division-manager/create')

  const allDivisionsLink = header.getByRole('link', { name: 'All divisions' })

  await expect(allDivisionsLink).toBeVisible()
  await Promise.all([
    page.waitForURL(/\/division-manager$/),
    activate(allDivisionsLink),
  ])
  await expect(page.getByRole('heading', { name: 'Division Manager' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'All divisions' })).toHaveCount(0)
})
