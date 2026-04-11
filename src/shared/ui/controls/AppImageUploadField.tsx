import { AppField, AppFileInput } from '@/shared/ui/controls';
import { AppButton } from '@/shared/ui/primitives';

export interface AppImageUploadFieldProps {
  imageSrc?: string;
  imageAlt?: string;
  fileName?: string;
  contentType?: string;
  label?: string;
  hint?: string;
  inputId?: string;
  accept?: string;
  buttonText?: string;
  emptyText?: string;
  onSelect?: (file: File | null) => void;
  onRemove?: () => void;
}

export const AppImageUploadField = ({
  imageSrc = '',
  imageAlt = 'Image preview',
  fileName = '',
  contentType = '',
  label = 'Upload image',
  hint = '',
  inputId,
  accept = '',
  buttonText = 'Choose file',
  emptyText = 'No file selected',
  onSelect,
  onRemove,
}: AppImageUploadFieldProps) => (
  <div className="app-image-upload-field">
    <div className="app-image-upload-field__preview">
      {imageSrc ? (
        <img className="app-image-upload-field__image" src={imageSrc} alt={imageAlt} />
      ) : (
        <div className="app-image-upload-field__placeholder">No banner uploaded</div>
      )}
    </div>

    <div className="app-image-upload-field__side">
      <AppField label={label} hint={hint} forId={inputId}>
        {({ ariaDescribedby }) => (
          <AppFileInput
            id={inputId}
            accept={accept}
            buttonText={buttonText}
            emptyText={emptyText}
            fileName={fileName}
            describedBy={ariaDescribedby}
            onSelect={onSelect}
          />
        )}
      </AppField>

      {fileName || contentType ? (
        <div className="app-image-upload-field__meta">
          <span>{fileName || 'Uploaded banner'}</span>
          <span>{contentType || 'image/*'}</span>
        </div>
      ) : null}

      {imageSrc ? (
        <AppButton type="button" variant="ghost" onClick={onRemove}>
          Remove banner
        </AppButton>
      ) : null}
    </div>
  </div>
);
