import type { InsightChartValue } from '@formant/ava';

export type InsightChartTimeOptions = {
  /**
   * `'auto'` (default): use an ECharts time axis when every x value parses as a date;
   * `true`: always try (values that don't parse are dropped); `false`: keep a category axis
   */
  axis?: 'auto' | boolean;
  /** x value → epoch ms, or `undefined` when it isn't a date; default: {@link parseInsightTime} */
  parse?: (value: InsightChartValue) => number | undefined;
};

// 2025-03-19, 2025-03-19 00:00:00, 2025-03-19T00:00:00.000Z, 2025-03-19T00:00:00+02:00
const ISO_LIKE = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/;

/** parse ISO-like date strings; zone-less values are local time (date-only values too, unlike `Date.parse`) */
export const parseInsightTime = (value: InsightChartValue): number | undefined => {
  if (typeof value !== 'string' || !ISO_LIKE.test(value)) return undefined;
  const iso = value.length === 10 ? `${value}T00:00:00` : value.replace(' ', 'T');
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? undefined : ms;
};

/** a per-value x mapper when the axis should be a time axis, otherwise undefined */
export const resolveTimeAxis = (
  xValues: InsightChartValue[],
  { axis = 'auto', parse = parseInsightTime }: InsightChartTimeOptions = {}
): ((x: InsightChartValue) => number | undefined) | undefined => {
  if (axis === false || !xValues.length) return undefined;
  if (axis === 'auto' && !xValues.every((x) => parse(x) !== undefined)) return undefined;
  return parse;
};
