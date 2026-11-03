/**
 * Renderer-agnostic chart spec for insights.
 *
 * Strategies describe *what* to draw as a list of marks with semantic `role`s; renderers
 * (e.g. `@formant/ava-react`, which compiles to ECharts) decide *how* it looks via a theme.
 * No colors or renderer options live here, so a chart is restyled entirely by its theme.
 */

export type InsightChartValue = string | number;

/** semantic role of a mark; themes map each role to colors/styles */
export type InsightMarkRole =
  /** the data itself */
  | 'primary'
  /** emphasized data points, e.g. change points */
  | 'highlight'
  /** anomalous data, e.g. category / time series outliers */
  | 'outlier'
  /** expected value of a time series */
  | 'baseline'
  /** expected range of a time series */
  | 'band'
  /** fitted regression line */
  | 'trend'
  /** reference line at the mean */
  | 'mean';

export type InsightChartPoint = {
  x: InsightChartValue;
  y: number;
  /** text shown next to the point */
  label?: string;
};

type BaseMark = {
  role: InsightMarkRole;
  /** series name, shown in tooltips */
  name?: string;
};

export type InsightLineMark = BaseMark & {
  type: 'line';
  data: InsightChartPoint[];
  smooth?: boolean;
  /** text shown at the end of the line */
  label?: string;
};

export type InsightBarMark = BaseMark & {
  type: 'bar';
  data: InsightChartPoint[];
};

export type InsightPointMark = BaseMark & {
  type: 'point';
  data: InsightChartPoint[];
};

/** filled range between y0 and y1 */
export type InsightAreaMark = BaseMark & {
  type: 'area';
  data: { x: InsightChartValue; y0: number; y1: number }[];
  smooth?: boolean;
};

/** full-span horizontal reference line */
export type InsightRuleYMark = BaseMark & {
  type: 'ruleY';
  y: number;
  label?: string;
};

/** full-span vertical reference line */
export type InsightRuleXMark = BaseMark & {
  type: 'ruleX';
  x: InsightChartValue;
  label?: string;
};

/** pie / donut slices; only valid with `coordinate: 'polar'` */
export type InsightArcMark = BaseMark & {
  type: 'arc';
  data: { name: string; value: number }[];
  /** radii as fractions of the available radius */
  innerRadius?: number;
  outerRadius?: number;
};

export type InsightChartMark =
  | InsightLineMark
  | InsightBarMark
  | InsightPointMark
  | InsightAreaMark
  | InsightRuleYMark
  | InsightRuleXMark
  | InsightArcMark;

export type InsightChartAxis = {
  /** source field name, used as axis name in tooltips */
  field?: string;
  /** `category` for dimensions, `value` for measures */
  type: 'category' | 'value';
};

export type InsightChartSpec = {
  /** `cartesian`: x/y axes; `polar`: pie (arc marks only) */
  coordinate: 'cartesian' | 'polar';
  x?: InsightChartAxis;
  y?: InsightChartAxis;
  /** drawn in order: later marks paint on top */
  marks: InsightChartMark[];
};

export type ChangePointMark = {
  changePoint: InsightPointMark[];
};

export type TrendMark = {
  trendLine: InsightLineMark[];
};

export type TimeSeriesOutlierMark = {
  trendLine: InsightLineMark[];
  anomalyArea: InsightAreaMark[];
  outliers?: InsightPointMark[];
};

export type CategoryOutlierMark = {
  categoryOutlier: InsightBarMark[];
};

export type LowVarianceMark = {
  meanLine: InsightRuleYMark[];
};

export type AugmentedMarks =
  | ChangePointMark[]
  | TrendMark[]
  | TimeSeriesOutlierMark[]
  | CategoryOutlierMark[]
  | LowVarianceMark[];
