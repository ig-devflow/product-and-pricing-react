export function buildDataUrl(
  base64: string,
  contentType = 'image/png',
): string {
  const normalizedBase64 = base64.trim();

  if (!normalizedBase64) {
    return '';
  }

  if (normalizedBase64.startsWith('data:')) {
    return normalizedBase64;
  }

  return `data:${contentType};base64,${normalizedBase64}`;
}
