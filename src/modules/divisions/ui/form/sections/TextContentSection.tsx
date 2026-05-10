import { useMemo } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ContentTemplateScopeDto } from '@/shared/api/reference-data/types';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useAudiencesQuery } from '@/shared/queries/useAudiencesQuery';
import { useContentTemplatesQuery } from '@/shared/queries/useContentTemplatesQuery';
import { AppField, AppSelect } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppButton, AppTextarea } from '@/shared/ui/primitives';
import { createEmptyTextContentFormValue } from '@/modules/divisions/model/mappers';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import { contentFormatOptions } from '@/modules/divisions/model/view-options';

function buildFallbackOption(
  value: string,
  labelPrefix: string,
): { value: string; label: string } | null {
  return value ? { value, label: `${labelPrefix} #${value}` } : null;
}

export const TextContentSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'texts',
  });
  const contentTemplatesQuery = useContentTemplatesQuery(
    ContentTemplateScopeDto.Division,
  );
  const audiencesQuery = useAudiencesQuery();
  const hasLoadedTemplates = Boolean(contentTemplatesQuery.data?.length);
  const hasLoadedAudiences = Boolean(audiencesQuery.data?.length);

  const templateOptions = useMemo(() => {
    const options = (contentTemplatesQuery.data ?? []).map((template) => ({
      label: template.name,
      value: String(template.id),
    }));

    const selectedValues = fields.map((field) => field.contentTemplateId);
    const missingOptions = selectedValues
      .filter(
        (value) => value && !options.some((option) => option.value === value),
      )
      .map((value) => buildFallbackOption(value, 'Template'))
      .filter((option): option is { value: string; label: string } =>
        Boolean(option),
      );

    return [...missingOptions, ...options];
  }, [contentTemplatesQuery.data, fields]);

  const audienceOptions = useMemo(() => {
    const options = (audiencesQuery.data ?? []).map((audience) => ({
      label: audience.name,
      value: String(audience.id),
    }));

    const selectedValues = fields.map((field) => field.audienceId);
    const missingOptions = selectedValues
      .filter(
        (value) => value && !options.some((option) => option.value === value),
      )
      .map((value) => buildFallbackOption(value, 'Audience'))
      .filter((option): option is { value: string; label: string } =>
        Boolean(option),
      );

    return [
      { label: 'All audiences', value: '' },
      ...missingOptions,
      ...options,
    ];
  }, [audiencesQuery.data, fields]);

  const templateHint = contentTemplatesQuery.isLoading
    ? 'Loading content templates...'
    : contentTemplatesQuery.error && !hasLoadedTemplates
      ? getApiErrorMessage(
          contentTemplatesQuery.error,
          'Content templates are unavailable right now.',
        )
      : undefined;

  const audienceHint = audiencesQuery.isLoading
    ? 'Loading audiences...'
    : audiencesQuery.error && !hasLoadedAudiences
      ? getApiErrorMessage(audiencesQuery.error, 'Audiences are unavailable right now.')
      : undefined;

  return (
    <AppSectionCard
      title="Text content"
      description="Reusable content blocks keyed by content template and optional audience."
      actions={
        <AppButton
          type="button"
          variant="secondary"
          onClick={() => append(createEmptyTextContentFormValue())}
        >
          Add text
        </AppButton>
      }
    >
      {fields.length ? (
        <div className="division-form-texts">
          {fields.map((field, index) => {
            const textErrors = errors.texts?.[index];
            const rowNumber = index + 1;

            return (
              <div key={field.id} className="division-form-texts__item">
                <div className="division-form-texts__header">
                  <h3 className="division-form-texts__title">
                    Text content {rowNumber}
                  </h3>
                  <AppButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </AppButton>
                </div>

                <AppFormGrid>
                  <AppField
                    label="Content template"
                    forId={`division-text-template-${field.id}`}
                    error={textErrors?.contentTemplateId?.message}
                    hint={templateHint}
                    required
                  >
                    {({ describedBy, labelId }) => (
                      <Controller
                        name={`texts.${index}.contentTemplateId`}
                        control={control}
                        render={({ field: templateField }) => (
                          <AppSelect
                            id={`division-text-template-${field.id}`}
                            value={templateField.value}
                            options={templateOptions}
                            placeholder={
                              contentTemplatesQuery.isLoading
                                ? 'Loading templates...'
                                : 'Select template'
                            }
                            searchable
                            searchPlaceholder="Search templates"
                            noOptionsText="No templates found"
                            disabled={
                              contentTemplatesQuery.isLoading ||
                              (contentTemplatesQuery.isError && !hasLoadedTemplates)
                            }
                            invalid={Boolean(textErrors?.contentTemplateId?.message)}
                            describedBy={describedBy}
                            labelledBy={labelId}
                            onValueChange={(value) => {
                              templateField.onChange(value);
                              templateField.onBlur();
                            }}
                          />
                        )}
                      />
                    )}
                  </AppField>

                  <AppField
                    label="Audience"
                    forId={`division-text-audience-${field.id}`}
                    error={textErrors?.audienceId?.message}
                    hint={audienceHint}
                  >
                    {({ describedBy, labelId }) => (
                      <Controller
                        name={`texts.${index}.audienceId`}
                        control={control}
                        render={({ field: audienceField }) => (
                          <AppSelect
                            id={`division-text-audience-${field.id}`}
                            value={audienceField.value}
                            options={audienceOptions}
                            placeholder={
                              audiencesQuery.isLoading
                                ? 'Loading audiences...'
                                : 'All audiences'
                            }
                            searchable
                            searchPlaceholder="Search audiences"
                            noOptionsText="No audiences found"
                            disabled={
                              audiencesQuery.isLoading ||
                              (audiencesQuery.isError && !hasLoadedAudiences)
                            }
                            invalid={Boolean(textErrors?.audienceId?.message)}
                            describedBy={describedBy}
                            labelledBy={labelId}
                            onValueChange={(value) => {
                              audienceField.onChange(value);
                              audienceField.onBlur();
                            }}
                          />
                        )}
                      />
                    )}
                  </AppField>

                  <AppField
                    label="Format"
                    forId={`division-text-format-${field.id}`}
                    error={textErrors?.format?.message}
                  >
                    {({ describedBy, labelId }) => (
                      <Controller
                        name={`texts.${index}.format`}
                        control={control}
                        render={({ field: formatField }) => (
                          <AppSelect
                            id={`division-text-format-${field.id}`}
                            value={formatField.value}
                            options={contentFormatOptions}
                            invalid={Boolean(textErrors?.format?.message)}
                            describedBy={describedBy}
                            labelledBy={labelId}
                            onValueChange={(value) => {
                              formatField.onChange(value);
                              formatField.onBlur();
                            }}
                          />
                        )}
                      />
                    )}
                  </AppField>
                </AppFormGrid>

                <AppField
                  label="Content"
                  forId={`division-text-content-${field.id}`}
                  error={textErrors?.content?.message}
                  required
                >
                  {({ describedBy, labelId }) => (
                    <Controller
                      name={`texts.${index}.content`}
                      control={control}
                      render={({ field: contentField }) => (
                        <AppTextarea
                          id={`division-text-content-${field.id}`}
                          className="division-form-content__textarea"
                          value={contentField.value}
                          invalid={Boolean(textErrors?.content?.message)}
                          describedBy={describedBy}
                          labelledBy={labelId}
                          placeholder="Write content for this template and audience"
                          onChange={contentField.onChange}
                          onBlur={contentField.onBlur}
                        />
                      )}
                    />
                  )}
                </AppField>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="division-form-texts__empty">
          No text content has been added.
        </p>
      )}
    </AppSectionCard>
  );
};
