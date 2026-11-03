import { createContext, createElement, useContext, useMemo } from 'react';

import { isUndefined, merge, omitBy } from 'lodash';

import { toEChartsOption } from './compile';
import { mergeThemePartials, normalizeThemeInput } from './theme';

import type { ReactNode } from 'react';
import type { EChartsOption } from 'echarts';
import type { InsightChartSpec } from '@formant/ava';
import type { InsightChartTheme, InsightChartThemeInput } from './theme';
import type { InsightChartTimeOptions } from './time';

export type InsightChartOverrideContext = { spec: InsightChartSpec; theme: InsightChartTheme };

/** applied after compilation: an object is deep-merged (lodash `merge`), a function maps the option */
export type InsightChartEChartsOverride =
  | EChartsOption
  | ((option: EChartsOption, ctx: InsightChartOverrideContext) => EChartsOption);

export type InsightChartConfig = {
  /** `'light'` / `'dark'` built-in, or a partial theme deep-merged over the built-in for its mode */
  theme?: InsightChartThemeInput;
  /** read Formant CSS custom properties from the chart container; default true */
  cssVariables?: boolean;
  /** escape hatch to the raw ECharts option, applied last */
  echarts?: InsightChartEChartsOverride;
  /** registered ECharts theme name or theme object, passed to `echarts.init` */
  echartsTheme?: string | object;
  /** default `'canvas'` */
  renderer?: 'canvas' | 'svg';
  /** chart height in px; default 280 */
  height?: number;
  /** date-like x values → ECharts time axis; default `{ axis: 'auto' }` with ISO-like parsing */
  time?: InsightChartTimeOptions;
};

export const DEFAULT_INSIGHT_CHART_HEIGHT = 280;

const applyOverride = (
  option: EChartsOption,
  override: InsightChartEChartsOverride | undefined,
  ctx: InsightChartOverrideContext
): EChartsOption => (typeof override === 'function' ? override(option, ctx) : merge(option, override));

/** compile a spec and apply the user's `echarts` override on top */
export const buildInsightChartOption = (
  spec: InsightChartSpec,
  theme: InsightChartTheme,
  override?: InsightChartEChartsOverride,
  time?: InsightChartTimeOptions
): EChartsOption => applyOverride(toEChartsOption(spec, theme, { time }), override, { spec, theme });

/**
 * Merge two configs, `inner` winning. Theme partials deep-merge (a mode string acts as `{ mode }`),
 * object `echarts` overrides deep-merge, function overrides compose outer → inner, `time` merges shallowly.
 */
export const mergeInsightChartConfig = (outer: InsightChartConfig, inner: InsightChartConfig): InsightChartConfig => {
  const merged: InsightChartConfig = { ...outer, ...omitBy(inner, isUndefined) };
  if (outer.theme && inner.theme) {
    merged.theme = mergeThemePartials(normalizeThemeInput(outer.theme), normalizeThemeInput(inner.theme));
  }
  if (outer.time && inner.time) merged.time = { ...outer.time, ...inner.time };
  const { echarts: outerEcharts } = outer;
  const { echarts: innerEcharts } = inner;
  if (outerEcharts && innerEcharts) {
    merged.echarts =
      typeof outerEcharts === 'object' && typeof innerEcharts === 'object'
        ? merge({}, outerEcharts, innerEcharts)
        : (option, ctx) => applyOverride(applyOverride(option, outerEcharts, ctx), innerEcharts, ctx);
  }
  return merged;
};

const InsightChartContext = createContext<InsightChartConfig>({});

/** the config in effect here: every enclosing `InsightChartProvider`, merged */
export const useInsightChartConfig = () => useContext(InsightChartContext);

export type InsightChartProviderProps = InsightChartConfig & { children?: ReactNode };

/** set insight chart defaults for a subtree; nested providers merge over outer ones */
export const InsightChartProvider = ({
  children,
  theme,
  cssVariables,
  echarts,
  echartsTheme,
  renderer,
  height,
  time,
}: InsightChartProviderProps) => {
  const outer = useInsightChartConfig();
  const value = useMemo(
    () => mergeInsightChartConfig(outer, { theme, cssVariables, echarts, echartsTheme, renderer, height, time }),
    [outer, theme, cssVariables, echarts, echartsTheme, renderer, height, time]
  );
  return createElement(InsightChartContext.Provider, { value }, children);
};
