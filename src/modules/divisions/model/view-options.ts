import { ContentFormat } from './content-format';

export const DivisionVisaLetterNoteFormat = {
  PlainText: ContentFormat.PlainText,
  RichText: ContentFormat.Html,
} as const;

export type DivisionVisaLetterNoteFormat =
  (typeof DivisionVisaLetterNoteFormat)[keyof typeof DivisionVisaLetterNoteFormat];

export const divisionVisaLetterNoteFormatOptions: Array<{
  value: DivisionVisaLetterNoteFormat;
  label: string;
}> = [
  { value: DivisionVisaLetterNoteFormat.RichText, label: 'HTML' },
  { value: DivisionVisaLetterNoteFormat.PlainText, label: 'Plain text' },
];
