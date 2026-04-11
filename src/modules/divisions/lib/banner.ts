import { buildDataUrl } from '@/shared/lib/media/buildDataUrl';
import { readFileAsBase64Image } from '@/shared/lib/media/readFileAsBase64Image';
import type { DivisionBanner } from '../model/types';

export function getDivisionBannerSrc(
  banner: DivisionBanner | null | undefined,
): string {
  if (!banner?.imageBase64) {
    return '';
  }

  return buildDataUrl(banner.imageBase64, banner.contentType || 'image/png');
}

export async function fileToDivisionBanner(file: File): Promise<DivisionBanner> {
  const image = await readFileAsBase64Image(file);

  return {
    imageBase64: image.base64,
    contentType: image.contentType,
    fileName: image.fileName,
  };
}

export function cloneDivisionBanner(
  banner: DivisionBanner | null | undefined,
): DivisionBanner | null {
  if (!banner) {
    return null;
  }

  return {
    imageBase64: banner.imageBase64,
    contentType: banner.contentType,
    fileName: banner.fileName,
  };
}
