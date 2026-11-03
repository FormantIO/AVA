import { flatMap } from 'lodash';

import { arcSeries, areaSeries, barSeries, lineSeries, pointSeries, ruleSeries } from './series';
import { resolveTimeAxis } from './time';

import type { EChartsOption, SeriesOption, TooltipComponentFormatterCallbackParams } from 'echarts';
import type { InsightArcMark, InsightChartMark, InsightChartSpec, InsightChartValue } from '@formant/ava';
import type { InsightChartTheme } from './theme';
import type { CompileContext } from './series';
import type { InsightChartTimeOptions } from './time';

export type InsightChartCompileOptions = {
  /** how date-like x values become an ECharts time axis */
  time?: InsightChartTimeOptions;
};

/** time axes pad by a fraction of the span so edge bars aren't cut in half */
const TIME_BAR_GAP: [string, string] = ['4%', '4%'];

/** layout paddings (px) around the plot; extra top room when labels sit above marks */
const GRID_PADDING = { left: 8, right: 16, top: 16, bottom: 8 };
const GRID_TOP_WITH_LABELS = 32;
/** room outside containLabel for axis names on value/value charts */
const GRID_PADDING_WITH_AXIS_NAMES = { left: 24, bottom: 24 };
const X_AXIS_NAME_GAP = 26;
const Y_AXIS_NAME_GAP = 34;
/** bar charts label every category up to this many; beyond that ECharts hides overlapping labels */
const MAX_LABELED_BARS = 16;
/** above this many bars labels tilt */
const CROWDED_BARS = 6;
const CROWDED_LABEL_ROTATE = 30;
/** px before a bar label is truncated with an ellipsis; tilted, the first label's overhang must fit left of its bar */
const BAR_LABEL_WIDTH = 56;
const GRID_LEFT_WITH_TILTED_LABELS = 24;
const ANIMATION_MS = 300;

/** 41.0129 → 41.01, 0.000507 → 0.000507; non-numbers pass through */
export const formatInsightValue = (value: unknown): string => {
  if (typeof value !== 'number') return value == null ? '-' : String(value);
  return Math.abs(value) >= 1 || value === 0
    ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : value.toLocaleString(undefined, { maximumSignificantDigits: 3 });
};

const xValuesOf = (mark: InsightChartMark): InsightChartValue[] => {
  if (mark.type === 'ruleX') return [mark.x];
  if (mark.type === 'ruleY' || mark.type === 'arc') return [];
  return (mark.data as { x: InsightChartValue }[]).map((d) => d.x);
};

const axisStyle = (theme: InsightChartTheme, showSplitLine: boolean) => ({
  axisLine: { lineStyle: { color: theme.axis } },
  axisTick: { show: false },
  axisLabel: { color: theme.textSecondary, fontSize: theme.fontSize, fontFamily: theme.font, hideOverlap: true },
  splitLine: { show: showSplitLine, lineStyle: { color: theme.grid } },
});

const tooltipStyle = (theme: InsightChartTheme) => ({
  backgroundColor: theme.tooltip.background,
  borderColor: theme.tooltip.border,
  textStyle: { color: theme.tooltip.text, fontSize: theme.fontSize, fontFamily: theme.font },
  confine: true,
  valueFormatter: formatInsightValue,
});

const baseOption = (theme: InsightChartTheme): EChartsOption => ({
  backgroundColor: theme.background,
  color: theme.palette,
  textStyle: { fontFamily: theme.font, fontSize: theme.fontSize, color: theme.text },
  animationDuration: ANIMATION_MS,
  animationDurationUpdate: ANIMATION_MS,
});

/** compile a renderer-agnostic insight chart spec into a plain ECharts option; pure, no DOM */
export const toEChartsOption = (
  spec: InsightChartSpec,
  theme: InsightChartTheme,
  options: InsightChartCompileOptions = {}
): EChartsOption => {
  if (spec.coordinate === 'polar') {
    return {
      ...baseOption(theme),
      tooltip: { ...tooltipStyle(theme), trigger: 'item' },
      series: spec.marks.filter((m): m is InsightArcMark => m.type === 'arc').map((m) => arcSeries(m, theme)),
    };
  }

  const marks = spec.marks.filter((m) => m.type !== 'arc');
  const xValues = flatMap(marks, xValuesOf);
  const declaredType = spec.x?.type ?? (xValues.some((x) => typeof x === 'string') ? 'category' : 'value');
  const toTime = declaredType === 'category' ? resolveTimeAxis(xValues, options.time) : undefined;
  const xType = toTime ? 'time' : declaredType;
  const categories = xType === 'category' ? Array.from(new Set(xValues.map(String))) : undefined;
  const isOrdered = !!categories || !!toTime;
  const ctx: CompileContext = { theme, categories, toTime, barCount: 0 };

  const series = flatMap(marks, (mark, index): SeriesOption[] => {
    switch (mark.type) {
      case 'line':
        return [lineSeries(mark, ctx)];
      case 'bar':
        return [barSeries(mark, ctx)];
      case 'point':
        return [pointSeries(mark, ctx)];
      case 'area':
        return areaSeries(mark, ctx, index);
      case 'ruleX':
      case 'ruleY':
        return [ruleSeries(mark, ctx)];
      default:
        return [];
    }
  });

  const hasBar = marks.some((m) => m.type === 'bar');
  const hasLine = marks.some((m) => m.type === 'line' || m.type === 'area');
  const hasTopLabels = marks.some((m) => m.type === 'point' && m.data.some((d) => d.label));
  const boundaryGap = hasBar || !hasLine;
  // time/value axes take percentages: pad only for bars so edge bars aren't cut in half
  const continuousBoundaryGap = hasBar ? TIME_BAR_GAP : undefined;
  const xAxisStyle = axisStyle(theme, false);

  let xAxisLabel: Record<string, unknown> = xAxisStyle.axisLabel;
  let tiltedLabels = false;
  if (categories && !boundaryGap) {
    // without a boundary gap the first/last labels sit on the plot edges; keep them inside the chart
    xAxisLabel = { ...xAxisLabel, alignMinLabel: 'left', alignMaxLabel: 'right' };
  } else if (categories && hasBar && categories.length <= MAX_LABELED_BARS) {
    // label every bar so outliers stay identifiable; tilt and truncate when the axis is crowded
    tiltedLabels = categories.length > CROWDED_BARS;
    const rotate = tiltedLabels ? CROWDED_LABEL_ROTATE : 0;
    xAxisLabel = { ...xAxisLabel, interval: 0, hideOverlap: false, rotate, overflow: 'truncate', width: BAR_LABEL_WIDTH };
  }

  // value/value axes (correlation) have no category to explain them: name each with its field
  const axisName = (field?: string) =>
    isOrdered || !field
      ? {}
      : {
          name: field,
          nameLocation: 'middle',
          nameTextStyle: { color: theme.textSecondary, fontSize: theme.fontSize, fontFamily: theme.font },
        };
  const gridPadding = {
    ...GRID_PADDING,
    ...(isOrdered ? {} : GRID_PADDING_WITH_AXIS_NAMES),
    // containLabel under-measures truncated tilted labels; the first one overhangs to the left
    ...(tiltedLabels ? { left: GRID_LEFT_WITH_TILTED_LABELS } : {}),
  };

  return {
    ...baseOption(theme),
    grid: { ...gridPadding, top: hasTopLabels ? GRID_TOP_WITH_LABELS : gridPadding.top, containLabel: true },
    tooltip: {
      ...tooltipStyle(theme),
      trigger: isOrdered ? 'axis' : 'item',
      axisPointer: {
        type: hasBar && categories ? 'shadow' : 'line',
        lineStyle: { color: theme.axis },
        shadowStyle: { color: theme.grid, opacity: 0.5 },
      },
      // value/value (correlation): name both fields instead of a bare `x, y` pair
      formatter: isOrdered
        ? undefined
        : (params: TooltipComponentFormatterCallbackParams) => {
            const item = Array.isArray(params) ? params[0] : params;
            const [x, y] = item.value as [number, number];
            const marker = item.marker as string;
            return `${marker}${spec.x?.field ?? 'x'}: ${formatInsightValue(x)}<br/>${marker}${
              spec.y?.field ?? 'y'
            }: ${formatInsightValue(y)}`;
          },
    },
    xAxis: {
      type: xType,
      data: categories,
      boundaryGap: categories ? boundaryGap : continuousBoundaryGap,
      scale: !isOrdered,
      ...xAxisStyle,
      axisLabel: xAxisLabel,
      ...axisName(spec.x?.field),
      nameGap: X_AXIS_NAME_GAP,
    } as EChartsOption['xAxis'],
    yAxis: {
      type: spec.y?.type ?? 'value',
      scale: !hasBar,
      ...axisStyle(theme, true),
      ...axisName(spec.y?.field),
      nameGap: Y_AXIS_NAME_GAP,
    } as EChartsOption['yAxis'],
    series,
  };
};
