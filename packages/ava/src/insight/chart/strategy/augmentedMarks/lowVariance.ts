import { LowVarianceInfo, InsightInfo } from '../../../types';
import { ruleYMarkStrategy } from '../commonMarks';
import { insight2ChartStrategy } from '../chart';
import { InsightChartMark, LowVarianceMark } from '../../types';
import { augmentedMarks2Marks } from '../../utils';
import { dataFormat } from '../../../../utils';

export const lowVarianceAugmentedMarkStrategy = (insight: InsightInfo<LowVarianceInfo>): LowVarianceMark[] => {
  return insight.patterns.map(({ mean }) => ({
    meanLine: [ruleYMarkStrategy(mean, { role: 'mean', name: 'mean', label: `mean: ${dataFormat(mean)}` })],
  }));
};

export const lowVarianceStrategy = (insight: InsightInfo<LowVarianceInfo>): InsightChartMark[] => {
  const chartMark = insight2ChartStrategy(insight);
  const marks = augmentedMarks2Marks(lowVarianceAugmentedMarkStrategy(insight));
  return [chartMark, ...marks];
};
