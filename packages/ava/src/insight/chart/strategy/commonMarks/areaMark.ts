import type { InsightAreaMark } from '../../types';

export const areaMarkStrategy = (
  data: InsightAreaMark['data'],
  config: Omit<InsightAreaMark, 'type' | 'data'>
): InsightAreaMark => ({
  type: 'area',
  data,
  ...config,
});
