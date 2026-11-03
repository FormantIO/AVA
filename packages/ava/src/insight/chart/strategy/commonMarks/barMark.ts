import type { PointPatternInfo } from '../../../types';
import type { InsightBarMark } from '../../types';

/** get mark for point patterns, the patterns should have same dimension and measure */
export const barMarkStrategy = (
  patterns: PointPatternInfo[],
  config: Omit<InsightBarMark, 'type' | 'data'>
): InsightBarMark => ({
  type: 'bar',
  data: patterns.map(({ x, y }) => ({ x, y })),
  ...config,
});
