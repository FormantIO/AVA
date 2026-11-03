import { flattenDeep, map } from 'lodash';

import { AugmentedMarks, InsightChartMark } from './types';

export const augmentedMarks2Marks = (augmentedMarks: AugmentedMarks): InsightChartMark[] => {
  return flattenDeep(map(augmentedMarks, (augmentedMark) => Object.values(augmentedMark)));
};
