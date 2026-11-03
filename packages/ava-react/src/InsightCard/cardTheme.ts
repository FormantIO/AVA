import { kebabCase } from 'lodash';

import type { CSSProperties } from 'react';

/**
 * Design tokens for everything in an insight card except the chart (see `InsightChartTheme`).
 * Each token compiles to a CSS custom property (`summary.titleColor` → `--ava-summary-title-color`)
 * that the card's styled components read, falling back to the default look when unset. Tokens are
 * plain CSS values, so `var(--my-color)`, `1rem`, `600` etc. all work.
 */
export type InsightCardTheme = {
  /** font for the whole card; also used by the chart unless `chart.theme.font` is set */
  font: string;
  /** the card surface */
  card: { background: string; border: string; borderWidth: string; radius: string; padding: string };
  /** `title - measure` heading */
  title: { color: string; fontSize: string; fontWeight: string };
  /** insight type pill next to the title */
  badge: { background: string; color: string; fontSize: string; radius: string };
  /** subspace line under the title (`dimension: value`) */
  subtitle: { color: string; fontSize: string };
  /** the (i) icon and its hover tooltip */
  info: { iconColor: string; tooltipBackground: string; tooltipColor: string; tooltipFontSize: string };
  /** the boxed summary (`Time Series Outlier Detected` + sentence) */
  summary: {
    background: string;
    border: string;
    radius: string;
    padding: string;
    iconColor: string;
    titleColor: string;
    titleFontSize: string;
    titleFontWeight: string;
    textColor: string;
    textFontSize: string;
    textLineHeight: string;
  };
  /** the detail list under the summary */
  bullets: {
    color: string;
    fontSize: string;
    lineHeight: string;
    maxHeight: string;
    scrollbarColor: string;
  };
  /** inline values inside summary / bullets (metric values, dimension values, …) */
  entity: { color: string; fontWeight: string };
};

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export type InsightCardThemeInput = DeepPartial<InsightCardTheme>;

export const INSIGHT_CARD_CSS_VARIABLE_PREFIX = '--ava';

/** `['summary', 'titleColor']` → `--ava-summary-title-color`; the names the styled components read */
export const insightCardCssVariable = (...path: string[]) =>
  `${INSIGHT_CARD_CSS_VARIABLE_PREFIX}-${path.map(kebabCase).join('-')}`;

/** `var(--ava-…, fallback)`: how styled components consume a token */
export const cardToken = (path: string, fallback: string) => `var(${insightCardCssVariable(...path.split('.'))}, ${fallback})`;

/** compile tokens to CSS custom properties; unset tokens are omitted so the default look applies */
export const insightCardThemeToCssVars = (theme: InsightCardThemeInput = {}): CSSProperties => {
  const vars: Record<string, string> = {};
  const walk = (node: object, path: string[]) => {
    Object.entries(node).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      if (typeof value === 'object') walk(value, [...path, key]);
      else vars[insightCardCssVariable(...path, key)] = String(value);
    });
  };
  walk(theme, []);
  return vars as CSSProperties;
};
