import { isPlainObject, mergeWith } from 'lodash';

import type { InsightMarkRole } from '@formant/ava';

export type InsightChartMode = 'light' | 'dark';

/**
 * Design tokens every insight chart is compiled from. Change a token and every chart follows;
 * nothing in the compiled ECharts option is styled outside of these.
 */
export type InsightChartTheme = {
  mode: InsightChartMode;
  /** chart background; transparent lets the host card show through */
  background: string;
  /** primary text: pie labels, point/line labels */
  text: string;
  /** secondary text: axis labels */
  textSecondary: string;
  font: string;
  fontSize: number;
  /** split (grid) lines */
  grid: string;
  /** axis lines and axis pointer */
  axis: string;
  tooltip: {
    background: string;
    text: string;
    border: string;
  };
  /** categorical colors, used for pie slices */
  palette: string[];
  /** color of each semantic mark role */
  roles: Record<InsightMarkRole, string>;
  mark: {
    lineWidth: number;
    barRadius: number;
    barMaxWidth: number;
    pointSize: number;
    /** fill opacity of `band` areas */
    bandOpacity: number;
    /** dash pattern of trend / baseline lines and reference rules */
    dash: number[];
  };
};

/** arrays (palette, dash) are replaced, not merged */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends unknown[] ? T[K] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** a built-in mode, or a partial theme deep-merged over the built-in for its `mode` */
export type InsightChartThemeInput = InsightChartMode | DeepPartial<InsightChartTheme>;

const FONT = 'Inter, system-ui, sans-serif';

/** Formant categorical colors */
const FORMANT_PALETTE = [
  '#20a0ff',
  '#ea719d',
  '#795bce',
  '#f89973',
  '#f9c36e',
  '#2ec495',
  '#64d7d4',
  '#9a8261',
  '#94645f',
  '#7f5072',
  '#564a94',
  '#256faf',
  '#4a8d98',
  '#2d8376',
];

/** the Formant palette, darkened for contrast on light backgrounds */
const FORMANT_PALETTE_LIGHT = [
  '#1a8ae6',
  '#d9507f',
  '#6a4cc0',
  '#e8784c',
  '#e0a63e',
  '#20a37a',
  '#3bb3b0',
  '#8a7252',
  '#84544f',
  '#6f4062',
  '#4a3f84',
  '#1f5f99',
  '#3d7a84',
  '#23705f',
];

export const darkInsightChartTheme: InsightChartTheme = {
  mode: 'dark',
  background: 'transparent',
  text: '#ffffff',
  textSecondary: '#bac4e2',
  font: FONT,
  fontSize: 11,
  grid: '#1c1e2d',
  axis: '#3b4668',
  tooltip: {
    background: '#1c1e2d',
    text: '#ffffff',
    border: '#3b4668',
  },
  palette: FORMANT_PALETTE,
  roles: {
    primary: FORMANT_PALETTE[0],
    highlight: '#f89973',
    outlier: '#ea719d',
    baseline: '#ffa45c',
    band: '#ffd8b8',
    trend: '#f89973',
    mean: '#f89973',
  },
  mark: {
    lineWidth: 2,
    barRadius: 2,
    barMaxWidth: 24,
    pointSize: 8,
    bandOpacity: 0.2,
    dash: [4, 4],
  },
};

export const lightInsightChartTheme: InsightChartTheme = {
  mode: 'light',
  background: 'transparent',
  text: '#1c1e2d',
  textSecondary: '#657197',
  font: FONT,
  fontSize: 11,
  grid: '#e6e4e2',
  axis: '#c8ccd6',
  tooltip: {
    background: '#ffffff',
    text: '#1c1e2d',
    border: '#e6e4e2',
  },
  palette: FORMANT_PALETTE_LIGHT,
  roles: {
    primary: FORMANT_PALETTE_LIGHT[0],
    highlight: '#e8784c',
    outlier: '#d9507f',
    baseline: '#e6862f',
    band: '#f5b98a',
    trend: '#e8784c',
    mean: '#e8784c',
  },
  mark: {
    lineWidth: 2,
    barRadius: 2,
    barMaxWidth: 24,
    pointSize: 8,
    bandOpacity: 0.3,
    dash: [4, 4],
  },
};

const BUILT_IN_THEMES: Record<InsightChartMode, InsightChartTheme> = {
  dark: darkInsightChartTheme,
  light: lightInsightChartTheme,
};

/** deep merge where arrays replace instead of merging index-wise */
const replaceArrays = (_target: unknown, source: unknown) => (Array.isArray(source) ? [...source] : undefined);

export const mergeThemePartials = <T extends object>(...partials: (object | undefined)[]): T =>
  mergeWith({}, ...partials.filter(isPlainObject), replaceArrays);

export const normalizeThemeInput = (input?: InsightChartThemeInput): DeepPartial<InsightChartTheme> | undefined =>
  typeof input === 'string' ? { mode: input } : input;

/**
 * Resolve a full theme. Precedence: built-in base (by `mode`) < CSS variables < user input.
 * Mode comes from the input, else from the CSS variables (background luminance), else `'dark'`.
 * `roles.primary` follows `palette[0]` unless a CSS variable or the input sets it explicitly.
 */
export const resolveInsightChartTheme = (
  input?: InsightChartThemeInput,
  cssVars?: DeepPartial<InsightChartTheme>
): InsightChartTheme => {
  const user = normalizeThemeInput(input);
  const mode = user?.mode ?? cssVars?.mode ?? 'dark';
  const theme = mergeThemePartials<InsightChartTheme>(BUILT_IN_THEMES[mode], cssVars, user, { mode });
  if (!user?.roles?.primary && !cssVars?.roles?.primary) [theme.roles.primary] = theme.palette;
  return theme;
};
