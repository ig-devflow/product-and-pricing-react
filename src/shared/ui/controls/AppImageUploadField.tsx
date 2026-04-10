import {
  useMemo,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';
import { AppFileInput } from './AppFileInput';
import { cn } from '@/shared/lib/cn';

export interface AppImageUploadFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept'> {
  previewAlt?: string;
}

export const AppImageUploadField = ({
  className,
  previewAlt = 'Selected image preview',
  onChange,
  ...rest
}: AppImageUploadFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null);
    onChange?.(event);
  };

  const hasPreview = useMemo(() => previewUrl !== null, [previewUrl]);

  return (
    <div className={cn('app-image-upload-field', className)}>
      <AppFileInput accept="image/*" onChange={handleChange} {...rest} />
      {hasPreview ? (
        <img className="app-image-upload-field__preview" src={previewUrl!} alt={previewAlt} />
      ) : null}
    </div>
  );
};
