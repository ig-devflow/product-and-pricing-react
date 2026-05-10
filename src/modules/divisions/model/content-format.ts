export const ContentFormat = {
  None: 'none',
  PlainText: 'plainText',
  Html: 'html',
} as const;

export type ContentFormat = (typeof ContentFormat)[keyof typeof ContentFormat];
