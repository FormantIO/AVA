import { size } from 'lodash';

import { ChangePointInfo, InsightInfo } from '../../../types';
import { dataFormat, formatInsightDate } from '../../../../utils';
import { pointMarkStrategy } from '../commonMarks';
import { insight2ChartStrategy } from '../chart';
import { ChangePointMark, InsightChartMark } from '../../types';
import { augmentedMarks2Marks } from '../../utils';

export const changePointAugmentedMarksStrategy = (insight: InsightInfo<ChangePointInfo>): ChangePointMark[] => {
  const { patterns } = insight;

  if (!size(patterns)) return [];

  const { measure } = patterns[0];
  return patterns.map((pattern) => ({
    changePoint: [
      pointMarkStrategy([pattern], {
        role: 'highlight',
        name: 'change point',
        label: (pt) => `${formatInsightDate(pt.x)} · ${measure}: ${dataFormat(pt.y)}`,
      }),
    ],
  }));
};

export const changePointStrategy = (insight: InsightInfo<ChangePointInfo>): InsightChartMark[] => {
  const chart = insight2ChartStrategy(insight);
  const marks = augmentedMarks2Marks(changePointAugmentedMarksStrategy(insight));
  return [chart, ...marks];
};
