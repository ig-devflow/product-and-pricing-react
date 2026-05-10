import { ContentFormat } from './content-format';

export const contentFormatOptions: Array<{
  value: ContentFormat;
  label: string;
}> = [
  { value: ContentFormat.PlainText, label: 'Plain text' },
  { value: ContentFormat.Html, label: 'HTML' },
];

export function getContentFormatLabel(value: ContentFormat): string {
  if (value === ContentFormat.None) {
    return 'None';
  }

  return contentFormatOptions.find((option) => option.value === value)?.label ?? value;
}
