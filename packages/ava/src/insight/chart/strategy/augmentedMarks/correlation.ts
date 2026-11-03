import { CorrelationInfo, InsightInfo } from '../../../types';
import { insight2ChartStrategy } from '../chart';
import { InsightChartMark } from '../../types';

export const correlationStrategy = (insight: InsightInfo<CorrelationInfo>): InsightChartMark[] => {
  // todo add correlation regression line and value
  return [insight2ChartStrategy(insight)];
};
