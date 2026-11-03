import { isNil } from 'lodash';

import type { PointPatternInfo } from '../../../types';
import type { InsightPointMark } from '../../types';

/** get mark for point patterns, the patterns should have same dimension and measure */
export const pointMarkStrategy = (
  patterns: PointPatternInfo[],
  config: Omit<InsightPointMark, 'type' | 'data'> & { label?: (pattern: PointPatternInfo) => string }
): InsightPointMark => {
  const { label, ...markConfig } = config;
  const data = patterns
    .filter(({ x, y }) => !isNil(x) && !isNil(y))
    .map((pattern) => ({ x: pattern.x, y: pattern.y, ...(label ? { label: label(pattern) } : {}) }));
  return { type: 'point', data, ...markConfig };
};
