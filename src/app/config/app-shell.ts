import type { To } from 'react-router'
import { CENTRE_MANAGER_ROUTES, DIVISION_MANAGER_ROUTES, PRODUCT_MANAGER_ROUTES } from '@/app/config/routes'

export type AppShellTabId =
  | 'pricelist'
  | 'products'
  | 'discounts'
  | 'agents'
  | 'pricing-reference-data'
  | 'new-pricing-year'
  | 'calculator'

export type AppShellContextualLink = 'all-divisions' | 'all-centres' | 'all-courses' | 'all-accommodations' | 'all-addons' | 'all-transfers' | 'all-packages'

export interface AppShellRouteMeta {
  shellTab?: AppShellTabId
  shellContextualLink?: AppShellContextualLink
}

export interface AppRouteHandle {
  shell?: AppShellRouteMeta
}

export interface AppShellDropdownItem {
  id: string
  label: string
  hint?: string
  to?: To
  badge?: string
}

export interface AppShellDropdownGroup {
  id: string
  eyebrow?: string
  items: AppShellDropdownItem[]
}

export interface AppShellDropdownFooter {
  meta: string
  actionLabel?: string
  actionTo?: To
}

export interface AppShellTopTabConfig {
  id: AppShellTabId
  label: string
  to?: To | null
  inert?: boolean
  dropdownGroups?: AppShellDropdownGroup[]
  dropdownFooter?: AppShellDropdownFooter
  isMegaMenu?: boolean
}

export interface AppShellFooterLinkConfig {
  id: string
  label: string
  to: To
}

export const divisionManagerRouteMeta: AppShellRouteMeta = {
  shellTab: 'pricing-reference-data',
}

export const divisionManagerContextualRouteMeta: AppShellRouteMeta = {
  ...divisionManagerRouteMeta,
  shellContextualLink: 'all-divisions',
}

export const centreManagerRouteMeta: AppShellRouteMeta = {
  shellTab: 'pricing-reference-data',
}

export const centreManagerContextualRouteMeta: AppShellRouteMeta = {
  ...centreManagerRouteMeta,
  shellContextualLink: 'all-centres',
}

export const productManagerRouteMeta: AppShellRouteMeta = {
  shellTab: 'products',
}

export const productManagerCourseContextualRouteMeta: AppShellRouteMeta = {
  ...productManagerRouteMeta,
  shellContextualLink: 'all-courses',
}

export const productManagerAccommodationContextualRouteMeta: AppShellRouteMeta = {
  ...productManagerRouteMeta,
  shellContextualLink: 'all-accommodations',
}

export const productManagerAddonContextualRouteMeta: AppShellRouteMeta = {
  ...productManagerRouteMeta,
  shellContextualLink: 'all-addons',
}

export const productManagerTransferContextualRouteMeta: AppShellRouteMeta = {
  ...productManagerRouteMeta,
  shellContextualLink: 'all-transfers',
}

export const productManagerPackageContextualRouteMeta: AppShellRouteMeta = {
  ...productManagerRouteMeta,
  shellContextualLink: 'all-packages',
}

export const appShellContextualTargets: Record<AppShellContextualLink, To> = {
  'all-divisions': DIVISION_MANAGER_ROUTES.list,
  'all-centres': CENTRE_MANAGER_ROUTES.list,
  'all-courses': PRODUCT_MANAGER_ROUTES.courses.list,
  'all-accommodations': PRODUCT_MANAGER_ROUTES.accommodations.list,
  'all-addons': PRODUCT_MANAGER_ROUTES.addons.list,
  'all-transfers': PRODUCT_MANAGER_ROUTES.transfers.list,
  'all-packages': PRODUCT_MANAGER_ROUTES.packages.list,
}

export const appShellTopTabs: AppShellTopTabConfig[] = [
  {
    id: 'pricelist',
    label: 'Pricelist',
    inert: true,
    dropdownGroups: [
      {
        id: 'pricelist-items',
        items: [
          { id: 'all-pricelists', label: 'All pricelists', hint: 'Browse the full catalog' },
          { id: 'active-year', label: 'Active year', hint: '2026 published prices' },
          { id: 'drafts', label: 'Drafts & reviews', hint: 'Pending approval' },
          { id: 'archive', label: 'Archive', hint: 'Historical versions' },
        ],
      },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    isMegaMenu: true,
    dropdownGroups: [
      {
        id: 'products-items',
        eyebrow: 'Products',
        items: [
          { id: 'courses', label: 'Courses', hint: 'Language & exam tuition', to: PRODUCT_MANAGER_ROUTES.courses.list, badge: 'orange' },
          { id: 'accommodations', label: 'Accommodation', hint: 'Properties & their rooms', to: PRODUCT_MANAGER_ROUTES.accommodations.list },
          { id: 'addons', label: 'Add-ons', hint: 'Extras, exams, activities, insurance', to: PRODUCT_MANAGER_ROUTES.addons.list },
          { id: 'transfers', label: 'Transfers', hint: 'Airport & port transfers', to: PRODUCT_MANAGER_ROUTES.transfers.list },
        ],
      },
      {
        id: 'bundles-items',
        eyebrow: 'Bundles',
        items: [
          { id: 'packages', label: 'Packages', hint: 'Bundles of other products', to: PRODUCT_MANAGER_ROUTES.packages.list },
        ],
      },
      {
        id: 'fees-items',
        eyebrow: 'Fees',
        items: [
          { id: 'fee', label: 'Fee', hint: 'Coming soon' },
          { id: 'cancellation-fee', label: 'Cancellation fee', hint: 'Coming soon' },
        ],
      },
    ],
    dropdownFooter: {
      meta: 'Sellable catalog · Fees are charges, not products',
    },
  },
  {
    id: 'discounts',
    label: 'Discounts',
    inert: true,
    dropdownGroups: [
      {
        id: 'discounts-items',
        items: [
          { id: 'volume-rules', label: 'Volume rules', hint: 'Tiered & threshold based' },
          { id: 'promo-codes', label: 'Promo codes', hint: 'Time-boxed campaigns' },
          { id: 'agent-rebates', label: 'Agent rebates', hint: 'Channel-specific terms' },
          { id: 'approval-queue', label: 'Approval queue', hint: 'Awaiting sign-off' },
        ],
      },
    ],
  },
  {
    id: 'agents',
    label: 'Agents',
    inert: true,
    dropdownGroups: [
      {
        id: 'agents-items',
        items: [
          { id: 'agent-directory', label: 'Agent directory', hint: 'All partners & contacts' },
          { id: 'commission-rules', label: 'Commission rules', hint: 'Splits & payout terms' },
          { id: 'performance', label: 'Performance', hint: 'Volumes by period' },
          { id: 'onboarding', label: 'Onboarding', hint: 'New-agent workflow' },
        ],
      },
    ],
  },
  {
    id: 'pricing-reference-data',
    label: 'Pricing Reference Data',
    inert: true,
    isMegaMenu: true,
    dropdownGroups: [
      {
        id: 'managers',
        eyebrow: 'Managers',
        items: [
          {
            id: 'division-manager',
            label: 'Division Manager',
            hint: 'Divisions, currencies & policy',
            to: DIVISION_MANAGER_ROUTES.list,
          },
          {
            id: 'centre-manager',
            label: 'Centre Manager',
            hint: 'Physical and online centres',
            to: CENTRE_MANAGER_ROUTES.list,
          },
        ],
      },
      {
        id: 'commercial',
        eyebrow: 'Commercial',
        items: [
          { id: 'currencies', label: 'Currencies', hint: 'ISO codes & FX sources' },
          { id: 'price-groups', label: 'Price groups', hint: 'Customer segmentation' },
          { id: 'channels', label: 'Channels', hint: 'Direct, wholesale, partner' },
        ],
      },
    ],
    dropdownFooter: {
      meta: 'Reference data · admin only',
      actionLabel: 'Open full reference →',
      actionTo: DIVISION_MANAGER_ROUTES.list,
    },
  },
  {
    id: 'new-pricing-year',
    label: 'New Pricing Year',
    inert: true,
    dropdownGroups: [
      {
        id: 'npy-items',
        items: [
          { id: 'plan-year', label: 'Plan year', hint: 'Start a new pricing cycle' },
          { id: 'compare-years', label: 'Compare years', hint: 'Diff against prior period' },
          { id: 'import-previous', label: 'Import previous', hint: 'Carry forward base' },
          { id: 'publish-year', label: 'Publish year', hint: 'Release for sales use' },
        ],
      },
    ],
  },
  {
    id: 'calculator',
    label: 'Calculator',
    inert: true,
    dropdownGroups: [
      {
        id: 'calc-items',
        items: [
          { id: 'quick-calc', label: 'Quick calc', hint: 'Single product preview' },
          { id: 'bulk-calc', label: 'Bulk calc', hint: 'CSV in, CSV out' },
          { id: 'saved-scenarios', label: 'Saved scenarios', hint: 'What-if analyses' },
        ],
      },
    ],
  },
]

export const productManagerShellBrand = {
  to: PRODUCT_MANAGER_ROUTES.courses.list,
  title: 'Products & Pricing',
  subtitle: 'Product Manager',
  ariaLabel: 'Products and Pricing home',
} as const

export const productManagerShellHeaderCopy = {
  serviceLabel: 'Admin operations workspace',
  contextualLinkLabel: 'Back to products',
  sectionsAriaLabel: 'Products and Pricing sections',
} as const

export const appShellBrand = {
  to: DIVISION_MANAGER_ROUTES.list,
  title: 'Products & Pricing',
  subtitle: 'Division Manager',
  ariaLabel: 'Products and Pricing home',
} as const

export const centreShellBrand = {
  to: CENTRE_MANAGER_ROUTES.list,
  title: 'Products & Pricing',
  subtitle: 'Centre Manager',
  ariaLabel: 'Products and Pricing home',
} as const

export const appShellHeaderCopy = {
  serviceLabel: 'Admin operations workspace',
  contextualLinkLabel: 'Back to divisions',
  sectionsAriaLabel: 'Products and Pricing sections',
} as const

export const centreShellHeaderCopy = {
  serviceLabel: 'Admin operations workspace',
  contextualLinkLabel: 'Back to centres',
  sectionsAriaLabel: 'Products and Pricing sections',
} as const

export const appShellFooterCopy = {
  title: 'Products & Pricing',
  description:
    'Division Manager keeps division details, pricing context, and content settings in one clean workspace.',
  metaTitle: 'Product',
  metaDescription: 'Admin shell for operational workflows.',
  copyrightLabel: 'Products & Pricing. Internal product interface.',
} as const

export const appShellFooterLinks: AppShellFooterLinkConfig[] = [
  {
    id: 'division-manager',
    label: 'Division Manager',
    to: DIVISION_MANAGER_ROUTES.list,
  },
  {
    id: 'create-division',
    label: 'Create division',
    to: DIVISION_MANAGER_ROUTES.create,
  },
  {
    id: 'centre-manager',
    label: 'Centre Manager',
    to: CENTRE_MANAGER_ROUTES.list,
  },
]
