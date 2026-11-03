import React from 'react';

import { insightCardThemeToCssVars } from './cardTheme';

import type { ReactNode } from 'react';
import type { InsightCardThemeInput } from './cardTheme';

export type InsightCardThemeProviderProps = { theme: InsightCardThemeInput; children?: ReactNode };

/**
 * Set card design tokens for a subtree. Tokens are CSS variables, so they cascade: a card's own
 * `theme` prop wins over the nearest provider, which wins over outer ones. `display: contents`
 * keeps the wrapper out of layout.
 */
export const InsightCardThemeProvider = ({ theme, children }: InsightCardThemeProviderProps) => (
  <div style={{ display: 'contents', ...insightCardThemeToCssVars(theme) }}>{children}</div>
);
