import { ContentFormatDto } from '@/modules/divisions/api/dto';
import { ContentFormat } from './content-format';

export function mapContentFormatFromDto(value: ContentFormatDto): ContentFormat {
  return value === ContentFormatDto.Html
    ? ContentFormat.Html
    : ContentFormat.PlainText;
}

export function mapContentFormatToDto(value: ContentFormat): ContentFormatDto {
  return value === ContentFormat.Html
    ? ContentFormatDto.Html
    : ContentFormatDto.PlainText;
}
