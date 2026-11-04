import { format } from 'date-fns';
import { formatDateRange } from 'little-date';

// 2025-03-19, 2025-03-19 00:00:00, 2025-03-19T00:00:00.000Z, 2025-03-19T00:00:00+02:00
const ISO_LIKE = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/;

/**
 * Parse an insight dimension value as a date. Only ISO-like strings and Date objects count;
 * zone-less values are local time. `new Date('2025-03-19 00:00:00')` is non-standard (older
 * Safari rejects it), so the space is normalised to `T` first.
 */
export const parseInsightDate = (value: unknown): Date | undefined => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value;
  if (typeof value !== 'string' || !ISO_LIKE.test(value)) return undefined;
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value.replace(' ', 'T'));
  return Number.isNaN(date.getTime()) ? undefined : date;
};

// a zone designator means an absolute instant (e.g. an hourly UTC bucket): always show its time
const ZONED = /\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})$/;

/**
 * Whether to print a time of day. Zoned instants always do, so an hourly series reads
 * `Oct 6, 23:00`, `Oct 7, 00:00` rather than switching to a date at local midnight. Zone-less
 * values only do when the clock is not midnight (`2025-03-19 00:00:00` is a daily bucket).
 */
const showsTime = (value: unknown, date: Date) =>
  value instanceof Date || (typeof value === 'string' && ZONED.test(value))
    ? true
    : date.getHours() !== 0 || date.getMinutes() !== 0;

/** `Oct 7, 2026`, or `Oct 7, 14:00` when the value carries a time of day; non-dates pass through */
export const formatInsightDate = (value: unknown): string => {
  const date = parseInsightDate(value);
  if (!date) return String(value);
  return format(date, showsTime(value, date) ? 'MMM d, HH:mm' : 'MMM d, yyyy');
};

/** `Oct 6 - 7, 2026` style range (little-date); non-dates fall back to `start ~ end` */
export const formatInsightDateRange = (start: unknown, end: unknown): string => {
  const from = parseInsightDate(start);
  const to = parseInsightDate(end);
  if (!from || !to) return `${start}~${end}`;
  return formatDateRange(from, to, { includeTime: false });
};
