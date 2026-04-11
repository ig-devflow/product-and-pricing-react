import type {
  CreateDivisionRequestDto,
  UpdateDivisionRequestDto,
} from '../api/dto';
import { ContentFormat } from './types';

export { ContentFormat };
export type {
  DivisionAddress,
  DivisionBanner,
  DivisionDetails,
  DivisionFormValues,
  DivisionListItem,
  DivisionReportText,
} from './types';

export const DivisionVisaLetterNoteFormat = {
  PlainText: ContentFormat.PlainText,
  RichText: ContentFormat.Html,
} as const;

export type DivisionVisaLetterNoteFormat =
  (typeof DivisionVisaLetterNoteFormat)[keyof typeof DivisionVisaLetterNoteFormat];

export type DivisionSummary = import('./types').DivisionListItem;

export type DivisionUpsertPayload =
  | CreateDivisionRequestDto
  | UpdateDivisionRequestDto;

export const divisionVisaLetterNoteFormatOptions: Array<{
  value: DivisionVisaLetterNoteFormat;
  label: string;
}> = [
  { value: DivisionVisaLetterNoteFormat.RichText, label: 'Rich text' },
  { value: DivisionVisaLetterNoteFormat.PlainText, label: 'Plain text' },
];
