import { lineMarkStrategy } from '../commonMarks';
import { insight2ChartStrategy } from '../chart';
import { InsightInfo, TrendInfo } from '../../../types';
import { InsightChartMark, TrendMark } from '../../types';
import { dataFormat } from '../../../../utils';

export const trendAugmentedMarksStrategy = (insight: InsightInfo<TrendInfo>): TrendMark[] => {
  const {
    data: chartData,
    dimensions: [{ fieldName: dimensionName }],
    patterns,
  } = insight;
  const {
    regression: {
      points,
      equation: [m, c],
    },
  } = patterns[0];

  const lineData = chartData.map((datum, index) => ({ x: datum[dimensionName], y: points[index] }));

  return [
    {
      trendLine: [
        lineMarkStrategy(lineData, {
          role: 'trend',
          name: 'trend',
          label: `y=${dataFormat(m)}x${c < 0 ? '' : '+'}${dataFormat(c)}`,
        }),
      ],
    },
  ];
};

export const trendStrategy = (insight: InsightInfo<TrendInfo>): InsightChartMark[] => {
  const chart = insight2ChartStrategy(insight);
  const trendMarks = trendAugmentedMarksStrategy(insight);
  return [chart, ...(trendMarks[0]?.trendLine ?? [])];
};
