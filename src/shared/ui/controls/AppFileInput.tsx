import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { AppButton } from '@/shared/ui/primitives';

export interface AppFileInputProps {
  id?: string;
  accept?: string;
  disabled?: boolean;
  buttonText?: string;
  emptyText?: string;
  fileName?: string;
  describedBy?: string;
  onSelect?: (file: File | null) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AppFileInput = forwardRef<HTMLInputElement, AppFileInputProps>(
  (
    {
      id,
      accept = '',
      disabled = false,
      buttonText = 'Choose file',
      emptyText = 'No file selected',
      fileName = '',
      describedBy,
      onSelect,
      onChange,
    },
    ref,
  ) => {
    const fallbackId = useId();
    const inputId = id ?? fallbackId;
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const displayName = selectedFileName || fileName || emptyText;

    const openPicker = () => {
      if (disabled) {
        return;
      }

      inputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;

      setSelectedFileName(file?.name ?? '');
      onSelect?.(file);
      onChange?.(event);

      event.target.value = '';
    };

    return (
      <div className="app-file-input">
        <input
          id={inputId}
          ref={inputRef}
          className="app-file-input__native"
          type="file"
          accept={accept}
          disabled={disabled}
          aria-describedby={describedBy}
          onChange={handleChange}
        />

        <div className="app-file-input__box">
          <AppButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={openPicker}
          >
            {buttonText}
          </AppButton>

          <span className="app-file-input__name">{displayName}</span>
        </div>
      </div>
    );
  },
);

AppFileInput.displayName = 'AppFileInput';
