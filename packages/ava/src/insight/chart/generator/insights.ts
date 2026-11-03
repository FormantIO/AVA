import { InsightInfo, PatternInfo } from '../../types';
import { InsightChartMark, InsightChartSpec } from '../types';
import {
  categoryOutlierStrategy,
  changePointStrategy,
  lowVarianceStrategy,
  majorityStrategy,
  correlationStrategy,
  timeSeriesOutlierStrategy,
  trendStrategy,
  viewSpecStrategy,
} from '../strategy';

export function generateInsightChartSpec(insight: InsightInfo<PatternInfo>): InsightChartSpec {
  const { type: insightType } = insight.patterns[0];

  const insightType2Strategy: Record<string, (insight: InsightInfo<PatternInfo>) => InsightChartMark[]> = {
    trend: trendStrategy,
    time_series_outlier: timeSeriesOutlierStrategy,
    category_outlier: categoryOutlierStrategy,
    change_point: changePointStrategy,
    low_variance: lowVarianceStrategy,
    majority: majorityStrategy,
    correlation: correlationStrategy,
  };

  const marks = insightType2Strategy[insightType]?.(insight) ?? [];
  return viewSpecStrategy(marks, insight);
}
