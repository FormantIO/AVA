import { set } from 'lodash';

import type { DeepPartial, InsightChartMode, InsightChartTheme } from './theme';

/**
 * Formant CSS custom properties and the theme token (dot path) each one feeds.
 * Empty or unset properties are skipped, so the built-in theme fills the gap.
 */
export const FORMANT_CSS_VARIABLES: ReadonlyArray<readonly [cssVariable: string, token: string]> = [
  ['--color-text-primary', 'text'],
  ['--color-text-secondary', 'textSecondary'],
  ['--color-border-primary', 'grid'],
  ['--color-border-secondary', 'axis'],
  ['--color-background-tertiary', 'tooltip.background'],
  ['--color-text-primary', 'tooltip.text'],
  ['--color-border-primary', 'tooltip.border'],
  ['--color-accent-primary', 'roles.primary'],
  // the card's `theme.font` token, so the chart matches the card text
  ['--ava-font', 'font'],
];

/** background whose luminance decides `mode` when the theme input does not set one */
export const FORMANT_MODE_CSS_VARIABLE = '--color-background-primary';

/** parse `#rgb`, `#rrggbb(aa)` or `rgb(a)(r, g, b)` into 0–255 channels */
const parseColor = (color: string): [number, number, number] | undefined => {
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)?.[1];
  if (hex) {
    const full = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
  }
  const rgb = color.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  return rgb ? [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] : undefined;
};

/** `dark` when the WCAG relative luminance of `color` is below 0.5; undefined if unparseable */
export const inferModeFromColor = (color: string): InsightChartMode | undefined => {
  const channels = parseColor(color.trim());
  if (!channels) return undefined;
  const [r, g, b] = channels.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5 ? 'dark' : 'light';
};

/** read Formant CSS custom properties visible from `el` as a partial insight chart theme */
export const readFormantCssVariables = (el: HTMLElement): DeepPartial<InsightChartTheme> => {
  const style = getComputedStyle(el);
  const theme: DeepPartial<InsightChartTheme> = {};
  FORMANT_CSS_VARIABLES.forEach(([cssVariable, token]) => {
    const value = style.getPropertyValue(cssVariable).trim();
    if (value) set(theme, token, value);
  });
  const mode = inferModeFromColor(style.getPropertyValue(FORMANT_MODE_CSS_VARIABLE));
  if (mode) theme.mode = mode;
  return theme;
};
