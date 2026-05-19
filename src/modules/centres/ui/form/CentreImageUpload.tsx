import { AppImageUploadField } from '@/shared/ui/controls';
import { buildDataUrl } from '@/shared/lib/media/buildDataUrl';
import { readFileAsBase64Image } from '@/shared/lib/media/readFileAsBase64Image';
import type { CentreImageFile } from '@/modules/centres/model/types';
import { ALLOWED_IMAGE_MIMES, MAX_IMAGE_BYTES } from '@/modules/centres/ui/form/schema';

export interface CentreImageUploadProps {
  image: CentreImageFile | null;
  label: string;
  onChange: (image: CentreImageFile | null) => void;
  error?: string;
}

export const CentreImageUpload = ({ image, label, onChange, error }: CentreImageUploadProps) => {
  const handleSelect = async (file: File | null) => {
    if (!file) return;
    if (!(ALLOWED_IMAGE_MIMES as readonly string[]).includes(file.type)) return;
    if (file.size > MAX_IMAGE_BYTES) return;
    const result = await readFileAsBase64Image(file);
    onChange(result);
  };

  const imageSrc = image ? buildDataUrl(image.base64, image.contentType) : '';

  return (
    <div>
      <AppImageUploadField
        imageSrc={imageSrc}
        imageAlt={`${label} preview`}
        fileName={image?.fileName}
        contentType={image?.contentType}
        label={`Upload ${label}`}
        inputId={`centre-img-${label}`}
        accept={ALLOWED_IMAGE_MIMES.join(',')}
        buttonText={`Choose ${label}`}
        emptyText="No file selected"
        onSelect={(file) => void handleSelect(file)}
        onRemove={() => onChange(null)}
      />
      {error ? (
        <p className="app-field__error" style={{ marginTop: 4 }}>
          {error}
        </p>
      ) : null}
    </div>
  );
};
