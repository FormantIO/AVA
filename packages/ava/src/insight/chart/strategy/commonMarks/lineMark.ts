import type { InsightChartPoint, InsightLineMark } from '../../types';

export const lineMarkStrategy = (
  data: InsightChartPoint[],
  config: Omit<InsightLineMark, 'type' | 'data'>
): InsightLineMark => ({
  type: 'line',
  data,
  ...config,
});
