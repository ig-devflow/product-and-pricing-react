import { describe, expect, it } from 'vitest';
import {
  buildAuditDisplayText,
  buildDivisionLocationText,
  buildEditorDisplayText,
  formatDateTime,
  getDivisionInitials,
  removeProtocol,
} from '../formatters';

describe('division formatters', () => {
  it('formats location from city and country', () => {
    expect(buildDivisionLocationText('London', 'United Kingdom')).toBe(
      'London, United Kingdom',
    );
    expect(buildDivisionLocationText('London', null)).toBe('London');
    expect(buildDivisionLocationText(null, 'United Kingdom')).toBe('United Kingdom');
    expect(buildDivisionLocationText(null, null)).toBe('');
  });

  it('formats admin date time values deterministically', () => {
    expect(formatDateTime('2026-05-10T14:08:00Z')).toBe('10 May 2026, 14:08');
    expect(formatDateTime('2026-05-10')).toBe('10 May 2026');
    expect(formatDateTime(null)).toBe('');
    expect(formatDateTime('not-a-date')).toBe('');
  });

  it('uses editor name or fallback text', () => {
    expect(buildEditorDisplayText(' System User ')).toBe('System User');
    expect(buildEditorDisplayText(null)).toBe('Unknown editor');
  });

  it('builds audit display text with a missing-date fallback', () => {
    expect(buildAuditDisplayText('10 May 2026, 14:08', 'System User', 'Missing')).toBe(
      '10 May 2026, 14:08 by System User',
    );
    expect(buildAuditDisplayText('', 'Unknown editor', 'Not updated yet')).toBe(
      'Not updated yet',
    );
  });

  it('formats website display text and initials', () => {
    expect(removeProtocol('https://www.example.com')).toBe('example.com');
    expect(getDivisionInitials('Test Division Alpha')).toBe('TD');
    expect(getDivisionInitials('')).toBe('--');
  });
});
