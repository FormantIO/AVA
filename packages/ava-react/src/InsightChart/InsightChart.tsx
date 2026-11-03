import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';
import { GridComponent, MarkLineComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { ThemeContext } from 'styled-components';

import {
  buildInsightChartOption,
  DEFAULT_INSIGHT_CHART_HEIGHT,
  mergeInsightChartConfig,
  useInsightChartConfig,
} from './config';
import { readFormantCssVariables } from './cssVariables';
import { resolveInsightChartTheme } from './theme';

import type { CSSProperties } from 'react';
import type { InsightChartSpec } from '@formant/ava';
import type { InsightChartConfig } from './config';

echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  CanvasRenderer,
  SVGRenderer,
]);

/** attributes on <html>/<body> whose changes may swap the theme's CSS variables */
const PAGE_THEME_ATTRIBUTES = ['class', 'style', 'data-theme'];
export type InsightChartProps = InsightChartConfig & {
  spec: InsightChartSpec;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
};

/** renders an insight chart spec with ECharts; props override any enclosing `InsightChartProvider` */
export const InsightChart = ({
  spec,
  width = '100%',
  className,
  style,
  theme,
  cssVariables,
  echarts: echartsOverride,
  echartsTheme,
  renderer,
  height,
  time,
}: InsightChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts>();
  const inherited = useInsightChartConfig();
  // theme switches re-read the CSS variables: styled-components theme changes re-render us, and
  // class/style/data-theme changes on <html>/<body> (ui-kit ThemeProvider, setProperty) bump this
  const styledTheme = useContext(ThemeContext);
  const [pageThemeVersion, setPageThemeVersion] = useState(0);

  const config = useMemo(
    () =>
      mergeInsightChartConfig(inherited, {
        theme,
        cssVariables,
        echarts: echartsOverride,
        echartsTheme,
        renderer,
        height,
        time,
      }),
    [inherited, theme, cssVariables, echartsOverride, echartsTheme, renderer, height, time]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const chart = echarts.init(el, config.echartsTheme, { renderer: config.renderer ?? 'canvas' });
    chartRef.current = chart;
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
      chart.dispose();
      chartRef.current = undefined;
    };
  }, [config.echartsTheme, config.renderer]);

  useEffect(() => {
    if (config.cssVariables === false || typeof MutationObserver === 'undefined') return undefined;
    const observer = new MutationObserver(() => setPageThemeVersion((version) => version + 1));
    [document.documentElement, document.body].forEach((node) =>
      observer.observe(node, { attributes: true, attributeFilter: PAGE_THEME_ATTRIBUTES })
    );
    return () => observer.disconnect();
  }, [config.cssVariables]);

  // declared after init so a re-init is followed by a fresh option
  useEffect(() => {
    const el = containerRef.current;
    const chart = chartRef.current;
    if (!el || !chart) return;
    const cssVars = config.cssVariables === false ? undefined : readFormantCssVariables(el);
    const resolvedTheme = resolveInsightChartTheme(config.theme, cssVars);
    chart.setOption(buildInsightChartOption(spec, resolvedTheme, config.echarts, config.time), { notMerge: true });
  }, [spec, config, styledTheme, pageThemeVersion]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height: config.height ?? DEFAULT_INSIGHT_CHART_HEIGHT, ...style }}
    />
  );
};
