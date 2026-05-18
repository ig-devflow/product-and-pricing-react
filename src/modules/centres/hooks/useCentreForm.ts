import { useCallback, useMemo, useReducer } from 'react'
import type { ZodIssue } from 'zod'
import type { CentreFormValues } from '../model/form.types'
import { STEP_SCHEMAS } from '../ui/form/schema'

export const WIZARD_STEPS = [
  { id: 'basic', label: 'Basic info' },
  { id: 'contact', label: 'Contact info' },
  { id: 'legal', label: 'Legal & ratios' },
  { id: 'bank', label: 'Bank details' },
  { id: 'contacts', label: 'Contacts & texts' },
] as const

export type WizardStepId = (typeof WIZARD_STEPS)[number]['id']

export type FormErrors = Record<string, string>

type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5'
const STEP_KEYS: StepKey[] = ['step1', 'step2', 'step3', 'step4', 'step5']

interface WizardState {
  values: CentreFormValues
  step: number
  errors: FormErrors
  touchedSteps: Set<number>
  isDirty: boolean
  hasConflict: boolean
}

type WizardAction =
  | { type: 'SET_STEP_VALUES'; stepKey: StepKey; patch: Partial<CentreFormValues[StepKey]> }
  | { type: 'SET_STEP'; step: number; errors?: FormErrors }
  | { type: 'SET_ERRORS'; errors: FormErrors }
  | { type: 'SET_CONFLICT'; hasConflict: boolean }
  | { type: 'RESET'; values: CentreFormValues }

function flattenZodIssues(issues: ZodIssue[]): FormErrors {
  const errors: FormErrors = {}
  for (const issue of issues) {
    const path = issue.path.join('.')
    if (path && !errors[path]) {
      errors[path] = issue.message
    }
  }
  return errors
}

function validateStep(stepIndex: number, values: CentreFormValues): FormErrors {
  const stepKey = STEP_KEYS[stepIndex]
  const schema = STEP_SCHEMAS[stepIndex]
  const result = schema.safeParse(values[stepKey])
  if (result.success) return {}
  return flattenZodIssues(result.error.issues)
}

function validateAll(values: CentreFormValues): FormErrors {
  const allErrors: FormErrors = {}
  for (let i = 0; i < WIZARD_STEPS.length; i++) {
    Object.assign(allErrors, validateStep(i, values))
  }
  return allErrors
}

function firstStepWithErrors(errors: FormErrors): number {
  const paths = Object.keys(errors)
  if (paths.length === 0) return -1

  const stepPrefixes = [
    ['name', 'code', 'currencyId', 'printFormat'],
    [
      'generalEmail',
      'accommodationEmail',
      'telephone',
      'emergencyTelephone',
      'transferEmergencyTelephone',
      'brandColor',
      'contactAddress',
      'logoImage',
    ],
    [
      'schoolSponsorshipNumber',
      'vatNumber',
      'registrationNumber',
      'vatExemptionNumber',
      'chequePayableTo',
      'guarantees',
      'individualsRatio',
      'staffingRatio',
      'emptyBeds',
    ],
    [
      'beneficiaryName',
      'accountNumber',
      'bankName',
      'iban',
      'swiftCode',
      'branchCode',
      'abaRoutingNo',
      'achAba',
      'intermediaryBankName',
      'intermediarySwiftCode',
      'bankAddress',
      'beneficiaryBankAddress',
      'intermediaryBankAddress',
    ],
    ['contacts', 'texts'],
  ]

  for (let i = 0; i < stepPrefixes.length; i++) {
    const prefixes = stepPrefixes[i]!
    if (
      paths.some((p) =>
        prefixes.some((pre) => p === pre || p.startsWith(pre + '.') || p.startsWith(pre)),
      )
    ) {
      return i
    }
  }
  return -1
}

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP_VALUES': {
      const newValues = {
        ...state.values,
        [action.stepKey]: { ...state.values[action.stepKey], ...action.patch },
      }

      // Re-validate all touched steps once the user has navigated past step 0
      const shouldRevalidate = state.touchedSteps.size > 1 || Object.keys(state.errors).length > 0
      const newErrors = shouldRevalidate ? validateAll(newValues) : state.errors

      return { ...state, values: newValues, errors: newErrors, isDirty: true }
    }
    case 'SET_STEP':
      return {
        ...state,
        step: action.step,
        touchedSteps: new Set([...state.touchedSteps, action.step]),
        ...(action.errors !== undefined ? { errors: action.errors } : {}),
      }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SET_CONFLICT':
      return { ...state, hasConflict: action.hasConflict }
    case 'RESET':
      return {
        values: action.values,
        step: 0,
        errors: {},
        touchedSteps: new Set([0]),
        isDirty: false,
        hasConflict: false,
      }
    default:
      return state
  }
}

export interface UseCentreFormOptions {
  initialValues: CentreFormValues
  onSubmit: (values: CentreFormValues) => Promise<void>
  onConflict?: () => void
}

export function useCentreForm({ initialValues, onSubmit, onConflict }: UseCentreFormOptions) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    values: initialValues,
    step: 0,
    errors: {},
    touchedSteps: new Set<number>([0]),
    isDirty: false,
    hasConflict: false,
  }))

  const setStepValues = useCallback(
    <K extends StepKey>(stepKey: K, patch: Partial<CentreFormValues[K]>) => {
      dispatch({
        type: 'SET_STEP_VALUES',
        stepKey,
        patch: patch as Partial<CentreFormValues[StepKey]>,
      })
    },
    [],
  )

  const goTo = useCallback((nextStep: number) => {
    if (nextStep < 0 || nextStep >= WIZARD_STEPS.length) return
    dispatch({ type: 'SET_STEP', step: nextStep })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onNext = useCallback(() => {
    const stepErrors = validateStep(state.step, state.values)
    if (Object.keys(stepErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors: { ...state.errors, ...stepErrors } })
      return
    }
    dispatch({ type: 'SET_STEP', step: state.step + 1 })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.step, state.values, state.errors])

  const onBack = useCallback(() => {
    goTo(state.step - 1)
  }, [state.step, goTo])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault?.()
      const allErrors = validateAll(state.values)
      if (Object.keys(allErrors).length > 0) {
        dispatch({ type: 'SET_ERRORS', errors: allErrors })
        const firstStep = firstStepWithErrors(allErrors)
        if (firstStep >= 0) goTo(firstStep)
        return
      }
      try {
        await onSubmit(state.values)
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status
        if (status === 409) {
          dispatch({ type: 'SET_CONFLICT', hasConflict: true })
          onConflict?.()
        } else {
          throw err
        }
      }
    },
    [state.values, onSubmit, onConflict, goTo],
  )

  const reset = useCallback((values: CentreFormValues) => {
    dispatch({ type: 'RESET', values })
  }, [])

  const stepStatus = useMemo(() => {
    return WIZARD_STEPS.map((_, i) => {
      const stepErrors = validateStep(i, state.values)
      const hasErrors = Object.keys(stepErrors).length > 0
      const isTouched = state.touchedSteps.has(i)
      const isCurrent = i === state.step
      return {
        isCompleted: !hasErrors && isTouched && !isCurrent,
        hasError: hasErrors && isTouched,
      }
    })
  }, [state.values, state.step, state.touchedSteps])

  return {
    values: state.values,
    step: state.step,
    errors: state.errors,
    isDirty: state.isDirty,
    hasConflict: state.hasConflict,
    stepStatus,
    setStepValues,
    goTo,
    onNext,
    onBack,
    handleSubmit,
    reset,
    isLastStep: state.step === WIZARD_STEPS.length - 1,
    isFirstStep: state.step === 0,
    nextStepLabel: state.step < WIZARD_STEPS.length - 1 ? WIZARD_STEPS[state.step + 1].label : null,
  }
}
