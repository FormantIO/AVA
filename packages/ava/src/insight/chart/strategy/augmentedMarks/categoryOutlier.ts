import { Mark } from '@antv/g2';
import { size } from 'lodash';

import { InsightInfo, CategoryOutlierInfo } from '../../../types';
import { insight2ChartStrategy } from '../chart';
import {  intervalMarkStrategy } from '../commonMarks';
import { CategoryOutlierMark } from '../../types';
import { augmentedMarks2Marks } from '../../utils';

export const categoryOutlierAugmentedMarksStrategy = (
  insight: InsightInfo<CategoryOutlierInfo>
): CategoryOutlierMark[] => {
  const { patterns } = insight;

  if (!size(patterns)) return [];

  const categoryOutlierMarks: CategoryOutlierMark[] = [];
  patterns.forEach((pattern) => {
    const rectMark = intervalMarkStrategy([pattern]);
    categoryOutlierMarks.push({
      categoryOutlier: [rectMark],
    });
  });

  return categoryOutlierMarks;
};

export const categoryOutlierStrategy = (insight: InsightInfo<CategoryOutlierInfo>): Mark[] => {
  const chart = insight2ChartStrategy(insight);
  const categoryOutlierMarks = categoryOutlierAugmentedMarksStrategy(insight);
  const marks = augmentedMarks2Marks(categoryOutlierMarks);
  return [chart, ...marks];
};
