import { size } from 'lodash';

import { InsightInfo, CategoryOutlierInfo } from '../../../types';
import { insight2ChartStrategy } from '../chart';
import { barMarkStrategy } from '../commonMarks';
import { CategoryOutlierMark, InsightChartMark } from '../../types';
import { augmentedMarks2Marks } from '../../utils';

export const categoryOutlierAugmentedMarksStrategy = (
  insight: InsightInfo<CategoryOutlierInfo>
): CategoryOutlierMark[] => {
  const { patterns } = insight;

  if (!size(patterns)) return [];

  return patterns.map((pattern) => ({
    categoryOutlier: [barMarkStrategy([pattern], { role: 'outlier', name: 'outlier' })],
  }));
};

export const categoryOutlierStrategy = (insight: InsightInfo<CategoryOutlierInfo>): InsightChartMark[] => {
  const chart = insight2ChartStrategy(insight);
  const marks = augmentedMarks2Marks(categoryOutlierAugmentedMarksStrategy(insight));
  return [chart, ...marks];
};
