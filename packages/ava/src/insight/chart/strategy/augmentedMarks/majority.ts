import { MajorityInfo, InsightInfo } from '../../../types';
import { insight2ChartStrategy } from '../chart';
import { InsightChartMark } from '../../types';

export const majorityStrategy = (insight: InsightInfo<MajorityInfo>): InsightChartMark[] => {
  return [insight2ChartStrategy(insight)];
};
