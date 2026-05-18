import { AppButton } from '@/shared/ui/primitives';
import { AppFileInput } from '@/shared/ui/controls';
import type { CentreImageFile } from '@/modules/centres/model/types';
import { ALLOWED_IMAGE_MIMES, MAX_IMAGE_BYTES } from '@/modules/centres/ui/form/schema';

export interface CentreImageUploadProps {
  image: CentreImageFile | null;
  label: string;
  onChange: (image: CentreImageFile | null) => void;
  error?: string;
}

export const CentreImageUpload = ({ image, label, onChange, error }: CentreImageUploadProps) => {
  const handleSelect = (file: File | null) => {
    if (!file) return;

    if (!(ALLOWED_IMAGE_MIMES as readonly string[]).includes(file.type)) {
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] ?? '';
      onChange({ base64, contentType: file.type, fileName: file.name });
    };
    reader.readAsDataURL(file);
  };

  const imageSrc = image?.base64
    ? `data:${image.contentType};base64,${image.base64}`
    : null;

  return (
    <div className="image-upload">
      <div className="image-upload__preview">
        {imageSrc ? (
          <img src={imageSrc} alt={`${label} preview`} />
        ) : (
          <span>No {label} uploaded</span>
        )}
      </div>
      <div className="image-upload__side">
        <AppFileInput
          accept={ALLOWED_IMAGE_MIMES.join(',')}
          buttonText={`Choose ${label}`}
          emptyText="No file selected"
          fileName={image?.fileName ?? ''}
          onSelect={handleSelect}
        />
        {error ? <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-status-danger-text)' }}>{error}</span> : null}
        {imageSrc ? (
          <AppButton type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
            Remove {label}
          </AppButton>
        ) : null}
      </div>
    </div>
  );
};
