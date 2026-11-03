import type { BarSeriesOption, LineSeriesOption, PieSeriesOption, ScatterSeriesOption } from 'echarts';
import type {
  InsightAreaMark,
  InsightArcMark,
  InsightBarMark,
  InsightChartValue,
  InsightLineMark,
  InsightPointMark,
  InsightRuleXMark,
  InsightRuleYMark,
} from '@formant/ava';
import type { InsightChartTheme } from './theme';

/** one builder per mark type: each maps a mark to ECharts series styled only from the theme */

const LABEL_PADDING: [number, number] = [3, 6];

/** y alone on category axes (position comes from the category index), `[x, y]` on value/time axes */
type DatumValue = number | [InsightChartValue, number];

export type CompileContext = {
  theme: InsightChartTheme;
  /** ordered categories when x is a category axis, otherwise undefined */
  categories?: string[];
  /** x → epoch ms when x is a time axis, otherwise undefined */
  toTime?: (x: InsightChartValue) => number | undefined;
  barCount: number;
};

/**
 * Align rows to the x axis: one datum per category (gaps are null) on category axes, so every
 * series shares indices (needed for stacking and bar overlays); `[ms, y]` pairs sorted by time on
 * time axes (unparseable x dropped); `[x, y]` pairs on value axes.
 */
const toSeriesData = <T extends { x: InsightChartValue }, D>(
  ctx: CompileContext,
  rows: T[],
  getY: (row: T) => number,
  toDatum: (row: T, value: DatumValue, y: number) => D
): (D | null)[] => {
  const { categories, toTime } = ctx;
  if (toTime) {
    return rows
      .map((row) => ({ row, ms: toTime(row.x) }))
      .filter((d): d is { row: T; ms: number } => d.ms !== undefined)
      .sort((a, b) => a.ms - b.ms)
      .map(({ row, ms }) => toDatum(row, [ms, getY(row)], getY(row)));
  }
  if (!categories) return rows.map((row) => toDatum(row, [row.x, getY(row)], getY(row)));
  const byCategory = new Map(rows.map((row) => [String(row.x), row]));
  return categories.map((category) => {
    const row = byCategory.get(category);
    return row ? toDatum(row, getY(row), getY(row)) : null;
  });
};

export const lineSeries = (mark: InsightLineMark, ctx: CompileContext): LineSeriesOption => {
  const { theme } = ctx;
  const color = theme.roles[mark.role];
  return {
    type: 'line',
    name: mark.name ?? mark.role,
    data: toSeriesData(
      ctx,
      mark.data,
      (row) => row.y,
      (_row, value) => value
    ),
    smooth: mark.smooth ?? false,
    showSymbol: false,
    symbolSize: theme.mark.pointSize,
    connectNulls: true,
    color,
    lineStyle: {
      color,
      width: theme.mark.lineWidth,
      type: mark.role === 'trend' || mark.role === 'baseline' ? theme.mark.dash : 'solid',
    },
    itemStyle: { color },
    endLabel: mark.label
      ? {
          show: true,
          formatter: () => mark.label,
          align: 'right',
          verticalAlign: 'bottom',
          padding: [0, 0, 4, 0],
          color,
          fontSize: theme.fontSize,
          fontFamily: theme.font,
        }
      : undefined,
  };
};

export const barSeries = (mark: InsightBarMark, ctx: CompileContext): BarSeriesOption => {
  const { theme } = ctx;
  const color = theme.roles[mark.role];
  const r = theme.mark.barRadius;
  const isOverlay = ctx.barCount > 0;
  ctx.barCount += 1;
  return {
    type: 'bar',
    name: mark.name ?? mark.role,
    // negative bars round their bottom corners instead of the top ones
    data: toSeriesData(
      ctx,
      mark.data,
      (row) => row.y,
      (_row, value, y) => (y < 0 ? { value, itemStyle: { borderRadius: [0, 0, r, r] } } : value)
    ),
    barMaxWidth: theme.mark.barMaxWidth,
    // later bars paint over earlier ones at the same category instead of beside them
    barGap: isOverlay ? '-100%' : undefined,
    itemStyle: { color, borderRadius: [r, r, 0, 0] },
  };
};

export const pointSeries = (mark: InsightPointMark, ctx: CompileContext): ScatterSeriesOption => {
  const { theme } = ctx;
  const color = theme.roles[mark.role];
  return {
    type: 'scatter',
    name: mark.name ?? mark.role,
    data: toSeriesData(
      ctx,
      mark.data,
      (row) => row.y,
      (row, value) =>
        row.label
          ? { value, label: { show: true, position: 'top' as const, distance: 8, formatter: () => row.label } }
          : value
    ),
    symbolSize: theme.mark.pointSize,
    itemStyle: { color },
    // tooltip-like callout above labeled points
    label: {
      color: theme.tooltip.text,
      backgroundColor: theme.tooltip.background,
      borderColor: theme.tooltip.border,
      borderWidth: 1,
      borderRadius: 4,
      padding: LABEL_PADDING,
      fontSize: theme.fontSize,
      fontFamily: theme.font,
    },
  };
};

/** a band between y0 and y1: an invisible y0 line with (y1 - y0) stacked on top and filled */
export const areaSeries = (mark: InsightAreaMark, ctx: CompileContext, index: number): LineSeriesOption[] => {
  const { theme } = ctx;
  const color = theme.roles[mark.role];
  const stack = `insight-band-${index}`;
  const common = {
    type: 'line' as const,
    stack,
    stackStrategy: 'all' as const,
    smooth: mark.smooth ?? false,
    showSymbol: false,
    connectNulls: true,
    lineStyle: { width: 0, color },
    itemStyle: { color },
    tooltip: { show: false },
    emphasis: { disabled: true },
    silent: true,
  };
  return [
    {
      ...common,
      name: `${mark.name ?? mark.role} (low)`,
      data: toSeriesData(
        ctx,
        mark.data,
        (row) => row.y0,
        (_row, value) => value
      ),
    },
    {
      ...common,
      name: mark.name ?? mark.role,
      data: toSeriesData(
        ctx,
        mark.data,
        (row) => row.y1 - row.y0,
        (_row, value) => value
      ),
      areaStyle: { color, opacity: theme.mark.bandOpacity },
    },
  ];
};

/** reference rules live as a markLine on an otherwise empty line series */
export const ruleSeries = (mark: InsightRuleYMark | InsightRuleXMark, ctx: CompileContext): LineSeriesOption => {
  const { theme } = ctx;
  const color = theme.roles[mark.role];
  const position =
    mark.type === 'ruleY' ? { yAxis: mark.y } : { xAxis: (ctx.toTime ? ctx.toTime(mark.x) : undefined) ?? mark.x };
  return {
    type: 'line',
    name: mark.name ?? mark.role,
    data: [],
    markLine: {
      silent: true,
      symbol: ['none', 'none'],
      animation: false,
      lineStyle: { color, width: theme.mark.lineWidth, type: theme.mark.dash },
      label: {
        show: !!mark.label,
        formatter: () => mark.label ?? '',
        position: mark.type === 'ruleY' ? 'insideEndTop' : 'insideEndBottom',
        color,
        fontSize: theme.fontSize,
        fontFamily: theme.font,
      },
      data: [position],
    },
  };
};

/** pie slices; labels hug the chart edges and wrap rather than truncate in narrow cards */
export const arcSeries = (mark: InsightArcMark, theme: InsightChartTheme): PieSeriesOption => ({
  type: 'pie',
  name: mark.name ?? mark.role,
  data: mark.data,
  radius: [`${(mark.innerRadius ?? 0) * 100}%`, `${(mark.outerRadius ?? 0.8) * 100}%`],
  percentPrecision: 1,
  itemStyle: { borderRadius: theme.mark.barRadius },
  label: {
    formatter: '{name|{b}}\n{percent|{d}%}',
    alignTo: 'edge',
    edgeDistance: 8,
    minMargin: 4,
    overflow: 'break',
    lineHeight: theme.fontSize + 4,
    fontFamily: theme.font,
    rich: {
      name: { color: theme.textSecondary, fontSize: theme.fontSize, fontFamily: theme.font },
      percent: { color: theme.text, fontSize: theme.fontSize, fontWeight: 'bold', fontFamily: theme.font },
    },
  },
  labelLine: { length: 8, length2: 0, lineStyle: { color: theme.axis } },
});
