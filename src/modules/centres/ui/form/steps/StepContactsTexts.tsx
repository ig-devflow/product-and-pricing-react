import { AppField, AppSelect } from '@/shared/ui/controls'
import { AppButton, AppInput, AppTextarea } from '@/shared/ui/primitives'
import { AppSectionCard } from '@/shared/ui/patterns'
import { useAudiencesQuery } from '@/shared/queries/useAudiencesQuery'
import { useContentTemplatesQuery } from '@/shared/queries/useContentTemplatesQuery'
import { ContentTemplateScopeDto } from '@/shared/api/reference-data/types'
import { ContentFormat } from '@/modules/divisions/model/content-format'
import type {
  CentreContactFormValue,
  CentreStep5Values,
  CentreTextContentFormValue,
} from '@/modules/centres/model/form.types'
import { CentreContactType, CENTRE_CONTACT_TYPE_OPTIONS } from '@/modules/centres/model/types'
import type { FormErrors } from '@/modules/centres/hooks/useCentreForm'
import {
  createEmptyContactFormValue,
  createEmptyTextContentFormValue,
} from '@/modules/centres/model/form.mappers'
import { CentreImageUpload } from '../CentreImageUpload'

const FORMAT_OPTIONS = [
  { value: ContentFormat.PlainText, label: 'Plain text' },
  { value: ContentFormat.Html, label: 'HTML' },
]

export interface StepContactsTextsProps {
  values: CentreStep5Values
  onChange: (patch: Partial<CentreStep5Values>) => void
  errors: FormErrors
}

export const StepContactsTexts = ({ values, onChange, errors }: StepContactsTextsProps) => {
  const audiencesQuery = useAudiencesQuery()
  const templatesQuery = useContentTemplatesQuery(ContentTemplateScopeDto.Centre)

  const audiences = audiencesQuery.data ?? []
  const templates = templatesQuery.data ?? []

  const audienceOptions = [
    { value: '', label: 'All audiences' },
    ...audiences.map((a) => ({ value: String(a.id), label: a.name })),
  ]

  const templateOptions = templates.map((t) => ({ value: String(t.id), label: t.name }))

  const contacts = values.contacts
  const texts = values.texts

  const usedContactTypes = new Set(
    contacts
      .map((c) => (c.contactType !== '' ? c.contactType : null))
      .filter(
        (
          x,
        ): x is
          | typeof CentreContactType.CentreDirector
          | typeof CentreContactType.DirectorOfStudies => x !== null,
      ),
  )

  const addContact = () => {
    if (contacts.length >= 2) return
    const next = createEmptyContactFormValue()
    const available = CENTRE_CONTACT_TYPE_OPTIONS.find((o) => !usedContactTypes.has(o.value))
    if (available) next.contactType = available.value
    onChange({ contacts: [...contacts, next] })
  }

  const updateContact = (i: number, patch: Partial<CentreContactFormValue>) => {
    const next = contacts.map((c, idx) => (idx === i ? { ...c, ...patch } : c))
    onChange({ contacts: next })
  }

  const removeContact = (i: number) => {
    onChange({ contacts: contacts.filter((_, idx) => idx !== i) })
  }

  const addText = () => {
    onChange({ texts: [...texts, createEmptyTextContentFormValue()] })
  }

  const updateText = (i: number, patch: Partial<CentreTextContentFormValue>) => {
    const next = texts.map((t, idx) => (idx === i ? { ...t, ...patch } : t))
    onChange({ texts: next })
  }

  const removeText = (i: number) => {
    onChange({ texts: texts.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="centre-form__step-body">
      <AppSectionCard
        title="Contacts"
        description="Up to two contacts — one centre director, one director of studies."
        actions={
          <AppButton
            type="button"
            variant="secondary"
            size="sm"
            onClick={addContact}
            disabled={contacts.length >= 2}
          >
            {contacts.length >= 2 ? 'Both roles added' : 'Add contact'}
          </AppButton>
        }
      >
        {contacts.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--color-text-disabled)' }}>
            No contacts yet. Use the button above to add one.
          </p>
        ) : (
          <div className="app-stack app-stack--lg">
            {contacts.map((c, i) => {
              const contactTypeOptions = CENTRE_CONTACT_TYPE_OPTIONS.filter(
                (o) => o.value === c.contactType || !usedContactTypes.has(o.value),
              ).map((o) => ({ value: String(o.value), label: o.label }))

              return (
                <div key={i} className="text-card">
                  <div className="text-card__header">
                    <h4 className="text-card__title">Contact {i + 1}</h4>
                    <AppButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContact(i)}
                    >
                      Remove
                    </AppButton>
                  </div>
                  <div className="app-form-grid app-form-grid--2col">
                    <AppField
                      label="Role"
                      required
                      forId={`f-c-type-${i}`}
                      error={errors[`contacts.${i}.contactType`]}
                    >
                      <AppSelect
                        id={`f-c-type-${i}`}
                        value={c.contactType !== '' ? String(c.contactType) : ''}
                        onValueChange={(v) =>
                          updateContact(i, {
                            contactType: v
                              ? (Number(v) as
                                  | typeof CentreContactType.CentreDirector
                                  | typeof CentreContactType.DirectorOfStudies)
                              : '',
                          })
                        }
                        options={contactTypeOptions}
                        invalid={!!errors[`contacts.${i}.contactType`]}
                        placeholder="Select role"
                      />
                    </AppField>
                    <AppField
                      label="Name"
                      required
                      forId={`f-c-name-${i}`}
                      error={errors[`contacts.${i}.name`]}
                    >
                      <AppInput
                        id={`f-c-name-${i}`}
                        value={c.name}
                        invalid={!!errors[`contacts.${i}.name`]}
                        onChange={(e) => updateContact(i, { name: e.target.value })}
                      />
                    </AppField>
                    <AppField
                      label="Email"
                      forId={`f-c-email-${i}`}
                      error={errors[`contacts.${i}.email`]}
                    >
                      <AppInput
                        id={`f-c-email-${i}`}
                        type="email"
                        value={c.email}
                        invalid={!!errors[`contacts.${i}.email`]}
                        onChange={(e) => updateContact(i, { email: e.target.value })}
                      />
                    </AppField>
                    <AppField
                      label="Signature image"
                      error={errors[`contacts.${i}.signatureImage`]}
                      hint="PNG, JPEG, WebP, or SVG up to 2 MB."
                    >
                      <CentreImageUpload
                        image={c.signatureImage}
                        label="signature"
                        onChange={(img) => updateContact(i, { signatureImage: img })}
                      />
                    </AppField>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </AppSectionCard>

      <AppSectionCard
        title="Text content"
        description="Generic text content linked by template and optional audience."
        actions={
          <AppButton type="button" variant="secondary" size="sm" onClick={addText}>
            Add text block
          </AppButton>
        }
      >
        {texts.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--color-text-disabled)' }}>
            No text content yet. Use the button above to add a block.
          </p>
        ) : (
          <div className="app-stack app-stack--lg">
            {texts.map((t, i) => {
              const hasContent = !!t.content.trim()
              const over = t.content.length > 10000
              const templateName =
                templates.find((tpl) => String(tpl.id) === t.contentTemplateId)?.name ||
                'Untitled text block'

              return (
                <div key={i} className="text-card">
                  <div className="text-card__header">
                    <h4 className="text-card__title">{templateName}</h4>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className={`text-card__chars${over ? ' text-card__chars--over' : ''}`}>
                        {t.content.length} / 10,000
                      </span>
                      <AppButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeText(i)}
                      >
                        Remove
                      </AppButton>
                    </div>
                  </div>
                  <div className="app-form-grid app-form-grid--2col">
                    <AppField
                      label="Template"
                      required
                      forId={`f-t-tpl-${i}`}
                      error={errors[`texts.${i}.contentTemplateId`]}
                    >
                      <AppSelect
                        id={`f-t-tpl-${i}`}
                        value={t.contentTemplateId}
                        onValueChange={(v) => updateText(i, { contentTemplateId: v ?? '' })}
                        options={templateOptions}
                        invalid={!!errors[`texts.${i}.contentTemplateId`]}
                        placeholder="Select template"
                      />
                    </AppField>
                    <AppField
                      label="Audience"
                      forId={`f-t-aud-${i}`}
                      hint="Leave empty to apply to all audiences."
                    >
                      <AppSelect
                        id={`f-t-aud-${i}`}
                        value={t.audienceId}
                        onValueChange={(v) => updateText(i, { audienceId: v ?? '' })}
                        options={audienceOptions}
                      />
                    </AppField>
                    {hasContent ? (
                      <AppField
                        label="Format"
                        required
                        forId={`f-t-fmt-${i}`}
                        error={errors[`texts.${i}.format`]}
                      >
                        <AppSelect
                          id={`f-t-fmt-${i}`}
                          value={
                            t.format === ContentFormat.None ? ContentFormat.PlainText : t.format
                          }
                          onValueChange={(v) =>
                            updateText(i, {
                              format: (v ?? ContentFormat.PlainText) as ContentFormat,
                            })
                          }
                          options={FORMAT_OPTIONS}
                          invalid={!!errors[`texts.${i}.format`]}
                        />
                      </AppField>
                    ) : (
                      <div className="app-field">
                        <span className="app-label" style={{ color: 'var(--color-text-tertiary)' }}>
                          Format
                        </span>
                        <p
                          className="app-field__hint"
                          style={{
                            padding: '14px 16px',
                            border: '1px dashed var(--color-border-strong)',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--color-bg-surface-soft)',
                            minHeight: 'var(--control-height-md)',
                            display: 'flex',
                            alignItems: 'center',
                            margin: 0,
                          }}
                        >
                          Add content to choose a format.
                        </p>
                      </div>
                    )}
                    <div />
                  </div>
                  <AppField
                    label="Content"
                    forId={`f-t-cnt-${i}`}
                    error={errors[`texts.${i}.content`]}
                  >
                    <AppTextarea
                      id={`f-t-cnt-${i}`}
                      className="division-form-content__textarea division-form-content__textarea--lg"
                      value={t.content}
                      invalid={!!errors[`texts.${i}.content`]}
                      onChange={(e) => {
                        const newContent = e.target.value
                        const newFormat =
                          newContent.trim() && t.format === ContentFormat.None
                            ? ContentFormat.PlainText
                            : !newContent.trim()
                              ? ContentFormat.None
                              : t.format
                        updateText(i, { content: newContent, format: newFormat })
                      }}
                    />
                  </AppField>
                </div>
              )
            })}
          </div>
        )}
      </AppSectionCard>
    </div>
  )
}
