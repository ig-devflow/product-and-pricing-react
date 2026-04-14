export const ContentFormat = {
  PlainText: 'plainText',
  Html: 'html',
} as const;

export type ContentFormat = (typeof ContentFormat)[keyof typeof ContentFormat];
