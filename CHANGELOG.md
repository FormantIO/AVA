# Formant fork

## @formant/ava 3.5.1-formant · @formant/ava-react 3.4.1-formant

- Readable dates in insight text and chart callouts. The change-point sentence now reads "during Oct 6 - 7" instead of the raw range `2026-10-06 00:00:00~2026-10-07 23:00:00`. The callout reads "Oct 7, 04:00 · value: 60.06".
- New `parseInsightDate` / `formatInsightDate` / `formatInsightDateRange` (exported from `@formant/ava` utils). The trend, time-series outlier and change-point narratives share them. `YYYY-MM-DD HH:mm:ss` values parse safely, including on older Safari. Non-date dimensions pass through unchanged.

## @formant/ava 3.5.0-formant · @formant/ava-react 3.4.0-formant

Insight charts render with Apache ECharts (`^5.6.0`) instead of AntV G2, and every part of an insight card is themeable.

### Breaking

- `InsightVisualizationSpec.chartSpec` is now an `InsightChartSpec`: a renderer-agnostic list of marks with semantic roles (`primary`, `outlier`, `band`, `trend`, …) and no colors. It is no longer a G2 spec. It is `undefined` for homogeneous insights.
- `annotationSpec` (`AugmentedMarks`) holds the same new mark types.
- `@formant/ava-react` no longer depends on `@antv/g2`; it depends on `echarts ^5.6.0`. `@formant/ava` still depends on `@antv/g2`, but only for advisor types.
- `NarrativeTextVis` no longer wraps each paragraph in a titled box. The box with the headline is now built by `InsightCard`.
- Removed the undocumented `getSelectedColorSetFromStorage` / `IThemeConfig` (the `formant-ui-platform-theme` localStorage lookup).

### Added

- `InsightCard` `chart` prop and `InsightChartProvider`: chart theme tokens (`palette`, `roles`, `mark`, text/grid/tooltip colors, font), an `echarts` option override that is deep-merged last (or a function), `echartsTheme`, `renderer`, `height`, and `time`.
- `InsightCard` `theme` prop and `InsightCardThemeProvider`: tokens for the card surface, title, badge, subtitle, summary box, bullets, inline values, info tooltip and font. They compile to `--ava-*` CSS variables.
- Standalone `InsightChart` component, plus `toEChartsOption`, `resolveInsightChartTheme` and `parseInsightTime`.
- Charts read the Formant CSS variables (`FORMANT_CSS_VARIABLES`). They re-theme when the styled-components theme changes or when `class`/`style`/`data-theme` changes on `<html>`/`<body>` (the ui-kit `ThemeProvider` toggles a `light`/`dark` class there).
- Date-like x values render on an ECharts time axis.

### Fixed

- Pie labels no longer truncate. Bar charts label every category (up to 16), so outlier bars are identifiable. Correlation axes are named.
- Summary headlines come from the insight type (`SUMMARY_TITLE_MAP`) instead of keyword-sniffing the text. "Anamoly" is gone.
- The category outlier sentence lists its outliers again (`useVariable: 'patterns'`). Fixed the "signifcant" typo in the trend narrative.
- The card `styles` prop is applied. The card border uses `--color-border-primary` (it was the invalid `---color-border-primary`).

### Upgrading consumers

The new versions are a minor bump on a prerelease tag. `^3.4.21-formant` and `^3.3.33-formant` do **not** match them, so each consumer must bump its range explicitly.

- **v2-coherence**: set `@formant/ava` to `^3.5.0-formant` and `@formant/ava-react` to `^3.4.0-formant`, then reinstall. No code changes are needed. `InsightCard` / `getInsights` usage in `AutoAnalytics.tsx` and `AutoDetector/*` type-checks unchanged, and nothing reads `chartSpec`. `echarts ^5.6.0` is already a dependency, so it dedupes. Optional: style cards app-wide with `<InsightCardThemeProvider>` / `<InsightChartProvider>`, or per card with the `theme` / `chart` props.
- **telemetry / query-api**: no change needed. It calls `getInsights` server-side without `visualization`, so no chart spec is produced. It can stay on `3.4.18-formant`, or bump to `3.5.0-formant` for the narrative fixes.
- **telemetry / frontend**: declares both packages but imports neither. Remove them, or bump the ranges as above. Note that it pins `echarts ^5.4.2`; with `ava-react` installed, npm resolves a second `echarts` 5.6 copy unless the app's range is raised to `^5.6.0`.

# CHANGES in AVA 3

## 3.0.0

<!-- @TODO neoddish: update url after new site deploy -->
[Migrating from v2 to v3](todo) 
