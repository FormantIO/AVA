import type { CustomBlockElement, InsightChartSpec, TextParagraphSpec } from '@formant/ava';

export type ChartsSchema = CustomBlockElement & {
  chartSpecs: InsightChartSpec[];
};

/** a titled summary box wrapping an insight's leading sentence */
export type InsightSummarySchema = CustomBlockElement & {
  title: string;
  paragraph: TextParagraphSpec;
};
