import { ContentFormatDto } from '@/modules/divisions/api/dto';
import { ContentFormat } from './content-format';

export function mapContentFormatFromDto(value: ContentFormatDto): ContentFormat {
  switch (value) {
    case ContentFormatDto.Html:
      return ContentFormat.Html;
    case ContentFormatDto.PlainText:
      return ContentFormat.PlainText;
    case ContentFormatDto.None:
    default:
      return ContentFormat.None;
  }
}

export function mapContentFormatToDto(value: ContentFormat): ContentFormatDto {
  switch (value) {
    case ContentFormat.Html:
      return ContentFormatDto.Html;
    case ContentFormat.PlainText:
      return ContentFormatDto.PlainText;
    case ContentFormat.None:
    default:
      return ContentFormatDto.None;
  }
}
