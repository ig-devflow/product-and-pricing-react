import { expect, test, type Locator, type Page, type Route } from '@playwright/test'

const sampleBannerBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9pQxWb8AAAAASUVORK5CYII='

const countries = [
  { id: 1, code: 'IE', name: 'Ireland' },
  { id: 2, code: 'MT', name: 'Malta' },
  { id: 3, code: 'GB', name: 'United Kingdom' },
]

const audiences = [
  { id: 1, name: 'Student' },
  { id: 2, name: 'Agent' },
]

const contentTemplates = [
  { id: 10, name: 'Visa letter note', description: null, scope: 1 },
  { id: 11, name: 'Arrival instructions', description: null, scope: 1 },
]

const auditMetadata = {
  createdAt: '2026-05-10T14:08:00Z',
  createdByName: 'System User',
  updatedAt: '2026-05-10T14:08:00Z',
  updatedByName: 'System User',
}

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

function createDivisionListItem(id: number, name: string) {
  return {
    id,
    name,
    isActive: true,
    websiteUrl: `https://${name.toLowerCase().replace(/\s+/g, '')}.example.com`,
    headOfficeEmail: 'hello@ecenglish.com',
    city: 'Valletta',
    countryName: 'Malta',
    ...auditMetadata,
  }
}

function createDivisionDetails(id: number, name: string) {
  const accreditationBanner: {
    data: string
    contentType: string
    fileName: string
  } | null = {
    data: sampleBannerBase64,
    contentType: 'image/png',
    fileName: `${name.toLowerCase().replace(/\s+/g, '-')}.png`,
  }

  return {
    id,
    name,
    termsAndConditions: 'Terms',
    groupsPaymentTerms: 'Groups terms',
    isActive: true,
    websiteUrl: `https://${name.toLowerCase().replace(/\s+/g, '')}.example.com`,
    contactAddress: {
      street: `${id} Main Street`,
      district: 'Central',
      city: 'Valletta',
      postalCode: 'VLT 1000',
      countryId: 2,
    },
    accreditationBanner,
    headOfficeEmail: 'hello@ecenglish.com',
    headOfficeTelephoneNo: '+356 1234 5678',
    ...auditMetadata,
    texts: [
      {
        id: 1,
        contentTemplateId: 10,
        contentTemplateName: 'Visa letter note',
        audienceId: null,
        audienceName: null,
        content: 'Existing text content',
        format: 1,
      },
    ],
    version: 'AAAAAAAAB9E=',
  }
}

function buildPagedResponse<TItem>(items: TItem[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    totalCount: items.length,
    page,
    pageSize,
  }
}

async function mockDivisionsApi(page: Page, options: { withoutBanner?: boolean } = {}) {
  const list = [createDivisionListItem(7, 'EC Malta')]
  const initialDetails = createDivisionDetails(7, 'EC Malta')
  if (options.withoutBanner) {
    initialDetails.accreditationBanner = null
  }
  const details = new Map<number, ReturnType<typeof createDivisionDetails>>([[7, initialDetails]])
  const createPayloads: Record<string, unknown>[] = []
  const updatePayloads: Record<string, unknown>[] = []
  let countryRequests = 0
  const divisionByIdPath = /^\/api\/v1\/divisions\/(\d+)$/

  await page.route(/\/api\/v1\/reference-data\/countries(?:\?.*)?$/, async (route) => {
    countryRequests += 1
    return jsonResponse(route, countries)
  })
  await page.route(/\/api\/v1\/reference-data\/currencies(?:\?.*)?$/, async (route) =>
    jsonResponse(route, []),
  )
  await page.route(/\/api\/v1\/reference-data\/audiences(?:\?.*)?$/, async (route) =>
    jsonResponse(route, audiences),
  )
  await page.route(/\/api\/v1\/reference-data\/content-templates(?:\?.*)?$/, async (route) =>
    jsonResponse(route, contentTemplates),
  )

  await page.route(/\/api\/v1\/divisions(?:\/\d+)?(?:\?.*)?$/, async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    const pathname = url.pathname
    const method = request.method()
    const divisionByIdMatch = divisionByIdPath.exec(pathname)

    if (method === 'GET' && pathname === '/api/v1/divisions') {
      const search = url.searchParams.get('search')?.trim().toLowerCase() ?? ''
      const pageNumber = Number(url.searchParams.get('page') ?? 1)
      const pageSize = Number(url.searchParams.get('pageSize') ?? 12)
      const filteredList = search
        ? list.filter((item) =>
            [
              item.name,
              item.websiteUrl,
              item.headOfficeEmail,
              item.city,
              item.countryName,
              item.createdByName,
              item.updatedByName,
            ]
              .filter(Boolean)
              .some((value) => value!.toLowerCase().includes(search)),
          )
        : list

      return jsonResponse(route, buildPagedResponse(filteredList, pageNumber, pageSize))
    }

    if (method === 'GET' && divisionByIdMatch) {
      const id = Number(divisionByIdMatch[1])
      return jsonResponse(
        route,
        details.get(id) ?? { message: 'Not found' },
        details.has(id) ? 200 : 404,
      )
    }

    if (method === 'POST' && pathname === '/api/v1/divisions') {
      const payload = request.postDataJSON() as Record<string, unknown>
      createPayloads.push(payload)

      const newId = 11
      const created = {
        ...createDivisionDetails(newId, String(payload.name ?? 'New division')),
        name: String(payload.name ?? 'New division'),
        websiteUrl: String(payload.websiteUrl ?? 'https://new.example.com'),
        contactAddress:
          (payload.contactAddress as ReturnType<typeof createDivisionDetails>['contactAddress']) ??
          null,
        accreditationBanner:
          (payload.accreditationBanner as
            | ReturnType<typeof createDivisionDetails>['accreditationBanner']
            | null) ?? null,
        headOfficeEmail: String(payload.headOfficeEmail ?? ''),
        headOfficeTelephoneNo: String(payload.headOfficeTelephoneNo ?? ''),
        texts:
          (payload.texts as ReturnType<typeof createDivisionDetails>['texts'] | undefined) ?? [],
      }

      list.unshift(createDivisionListItem(newId, created.name))
      details.set(newId, created)

      return jsonResponse(route, { id: newId }, 201)
    }

    if (method === 'PUT' && divisionByIdMatch) {
      const id = Number(divisionByIdMatch[1])
      const payload = request.postDataJSON() as Record<string, unknown>
      updatePayloads.push(payload)
      const current = details.get(id)

      if (!current) {
        return jsonResponse(route, { message: 'Not found' }, 404)
      }

      const updated = {
        ...current,
        name: String(payload.name ?? current.name),
        websiteUrl:
          typeof payload.websiteUrl === 'string' ? payload.websiteUrl : current.websiteUrl,
        contactAddress:
          (payload.contactAddress as typeof current.contactAddress | null) ??
          current.contactAddress,
        termsAndConditions:
          typeof payload.termsAndConditions === 'string'
            ? payload.termsAndConditions
            : current.termsAndConditions,
        groupsPaymentTerms:
          typeof payload.groupsPaymentTerms === 'string'
            ? payload.groupsPaymentTerms
            : current.groupsPaymentTerms,
        headOfficeEmail:
          typeof payload.headOfficeEmail === 'string'
            ? payload.headOfficeEmail
            : current.headOfficeEmail,
        headOfficeTelephoneNo:
          typeof payload.headOfficeTelephoneNo === 'string'
            ? payload.headOfficeTelephoneNo
            : current.headOfficeTelephoneNo,
        texts: (payload.texts as typeof current.texts | undefined) ?? current.texts,
        version: String(payload.version ?? current.version),
      }

      details.set(id, updated)
      const existingIndex = list.findIndex((item) => item.id === id)
      if (existingIndex >= 0) {
        list.splice(existingIndex, 1, {
          id,
          name: updated.name,
          isActive: updated.isActive,
          websiteUrl: updated.websiteUrl,
          headOfficeEmail: updated.headOfficeEmail,
          city: updated.contactAddress?.city ?? null,
          countryName:
            countries.find((country) => country.id === updated.contactAddress?.countryId)?.name ??
            null,
          createdAt: current.createdAt,
          createdByName: current.createdByName,
          updatedAt: auditMetadata.updatedAt,
          updatedByName: auditMetadata.updatedByName,
        })
      }

      return route.fulfill({ status: 204, body: '' })
    }

    return jsonResponse(route, { message: `Unhandled request: ${method} ${pathname}` }, 500)
  })

  return {
    createPayloads,
    updatePayloads,
    getCountryRequests: () => countryRequests,
  }
}

test('opens division details and saves edit changes', async ({ page }) => {
  const { updatePayloads, getCountryRequests } = await mockDivisionsApi(page)
  const header = page.getByRole('banner')

  await page.goto('/division-manager')
  await expect(page.getByRole('heading', { name: 'Division Manager' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Back to divisions' })).toHaveCount(0)
  await expect(page.getByText('EC Malta')).toBeVisible()
  await expect(page.getByText('ecmalta.example.com')).toBeVisible()
  await expect(page.getByText('Valletta, Malta')).toBeVisible()
  await expect(
    page
      .getByLabel('Division audit information')
      .locator('.division-card__audit-item')
      .filter({ hasText: 'Created' })
      .getByText('10 May 2026, 14:08 by System User'),
  ).toBeVisible()
  await expect(page.locator('.division-card img')).toHaveCount(0)
  await expect(page.getByText('Showing 1 of 1 divisions')).toBeVisible()

  const openLink = page.getByRole('link', { name: 'Open details' })
  await Promise.all([page.waitForURL(/\/division-manager\/7$/), activate(openLink)])
  await expect(header.getByRole('link', { name: 'Back to divisions' })).toBeVisible()
  await expect(page.getByText('7 Main Street, Central, Valletta, VLT 1000, Malta')).toBeVisible()
  await expect(page.getByText('Created')).toBeVisible()
  await expect(page.getByText('Last updated')).toBeVisible()
  expect(getCountryRequests()).toBeGreaterThan(0)

  const editDivisionButton = page.getByRole('button', { name: 'Edit division' })
  await Promise.all([page.waitForURL(/\/division-manager\/7\/edit$/), activate(editDivisionButton)])

  await page.getByLabel('Division name').fill('EC Malta Updated')
  const countryCombobox = page.getByRole('combobox', { name: 'Country' })
  await activate(countryCombobox)
  await page.getByPlaceholder('Search countries').fill('ire')
  await page.getByRole('option', { name: 'Ireland (IE)' }).click()
  await expect(countryCombobox).toContainText('Ireland (IE)')
  const saveChangesButton = page.getByRole('button', { name: 'Save changes' })
  await Promise.all([page.waitForURL(/\/division-manager\/7$/), activate(saveChangesButton)])
  await expect(page.getByText('7 Main Street, Central, Valletta, VLT 1000, Ireland')).toBeVisible()
  expect(updatePayloads).toHaveLength(1)
  expect(updatePayloads[0]?.name).toBe('EC Malta Updated')
  expect(updatePayloads[0]?.version).toBe('AAAAAAAAB9E=')
  expect(updatePayloads[0]?.contactAddress).toMatchObject({
    countryId: 1,
  })
  expect(updatePayloads[0]?.texts).toEqual([
    {
      contentTemplateId: 10,
      audienceId: null,
      content: 'Existing text content',
      format: 1,
    },
  ])
})

test('shows a details placeholder when accreditation banner is missing', async ({ page }) => {
  await mockDivisionsApi(page, { withoutBanner: true })

  await page.goto('/division-manager/7')

  await expect(page.getByText('No accreditation banner uploaded')).toBeVisible()
  await expect(page.getByText('Upload a banner when editing this division.')).toBeVisible()
  await expect(page.locator('.division-details-hero__media img')).toHaveCount(0)
})

test('creates a division and returns to the list', async ({ page }) => {
  const { createPayloads } = await mockDivisionsApi(page)
  const header = page.getByRole('banner')

  await page.goto('/division-manager/create')
  await expect(page.getByRole('heading', { name: 'Create division' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Back to divisions' })).toBeVisible()

  await page.getByLabel('Division name').fill('EC Dublin')
  await page.getByLabel('Website URL').fill('https://dublin.example.com')
  await page.getByLabel('Head office email').fill('dublin@ecenglish.com')
  await page.getByLabel('Head office phone').fill('+353 1 234 5678')
  await page.getByLabel('Street').fill('Grand Canal Quay')
  const countryCombobox = page.getByRole('combobox', { name: 'Country' })
  await activate(countryCombobox)
  await page.getByPlaceholder('Search countries').fill('ire')
  await page.getByRole('option', { name: 'Ireland (IE)' }).click()
  await expect(countryCombobox).toContainText('Ireland (IE)')

  await page.getByRole('button', { name: 'Add text' }).click()
  const templateCombobox = page.getByRole('combobox', { name: 'Content template' })
  await activate(templateCombobox)
  await page.getByRole('option', { name: 'Visa letter note' }).click()
  const audienceCombobox = page.getByRole('combobox', { name: 'Audience' })
  await activate(audienceCombobox)
  await page.getByRole('option', { name: 'Student' }).click()
  const formatCombobox = page.getByRole('combobox', { name: 'Format' })
  await activate(formatCombobox)
  await page.getByRole('option', { name: 'HTML' }).click()
  await page.getByRole('textbox', { name: 'Content' }).fill('Visa note for Dublin')

  await page.getByLabel('Terms and conditions').fill('Division terms')
  await page.getByLabel('Groups payment terms').fill('Groups terms')

  const createDivisionButton = page.getByRole('button', { name: 'Create division' })
  await activate(createDivisionButton)

  await expect(page).toHaveURL(/\/division-manager$/)
  await expect(page.getByText('EC Dublin')).toBeVisible()
  expect(createPayloads).toHaveLength(1)
  expect(createPayloads[0]?.name).toBe('EC Dublin')
  expect(createPayloads[0]?.headOfficeEmail).toBe('dublin@ecenglish.com')
  expect(createPayloads[0]?.contactAddress).toMatchObject({
    street: 'Grand Canal Quay',
    countryId: 1,
  })
  expect(createPayloads[0]?.texts).toEqual([
    {
      contentTemplateId: 10,
      audienceId: 1,
      content: 'Visa note for Dublin',
      format: 2,
    },
  ])
})

test('clears create banner file name when removing or resetting changes', async ({ page }) => {
  await mockDivisionsApi(page)
  const bannerFile = {
    name: 'malta-banner.png',
    mimeType: 'image/png',
    buffer: Buffer.from(sampleBannerBase64, 'base64'),
  }

  await page.goto('/division-manager/create')

  const bannerInput = page.getByLabel('Upload accreditation banner')

  await bannerInput.setInputFiles(bannerFile)
  await expect(page.getByText('malta-banner.png').first()).toBeVisible()

  await page.getByRole('button', { name: 'Remove banner' }).click()
  await expect(page.getByText('malta-banner.png')).toHaveCount(0)
  await expect(page.getByText('No file selected')).toBeVisible()

  await bannerInput.setInputFiles(bannerFile)
  await expect(page.getByText('malta-banner.png').first()).toBeVisible()

  await page.getByRole('button', { name: 'Reset changes' }).click()
  await expect(page.getByText('malta-banner.png')).toHaveCount(0)
  await expect(page.getByText('No file selected')).toBeVisible()
})

test('uses backend search parameter for list filtering', async ({ page }) => {
  await mockDivisionsApi(page)

  await page.goto('/division-manager')
  await page.getByRole('textbox', { name: 'Search' }).fill('missing')

  await expect(page).toHaveURL(/search=missing/)
  await expect(page.getByText('No divisions matched "missing".')).toBeVisible()
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
  await expect(header.getByRole('link', { name: 'Back to divisions' })).toHaveCount(0)

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

test('uses back to divisions as a contextual return link', async ({ page }) => {
  await mockDivisionsApi(page)
  const header = page.getByRole('banner')

  await page.goto('/division-manager/create')

  const backToDivisionsLink = header.getByRole('link', { name: 'Back to divisions' })

  await expect(backToDivisionsLink).toBeVisible()
  await Promise.all([page.waitForURL(/\/division-manager$/), activate(backToDivisionsLink)])
  await expect(page.getByRole('heading', { name: 'Division Manager' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Back to divisions' })).toHaveCount(0)
})
