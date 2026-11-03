import { TimeSeriesOutlierInfo, InsightInfo } from '../../../types';
import { InsightChartMark, TimeSeriesOutlierMark } from '../../types';
import { insight2ChartStrategy } from '../chart';
import { areaMarkStrategy, lineMarkStrategy, pointMarkStrategy } from '../commonMarks';

export const timeSeriesOutlierStrategyAugmentedMarksStrategy = (
  insight: InsightInfo<TimeSeriesOutlierInfo>
): TimeSeriesOutlierMark[] => {
  const {
    data: chartData,
    dimensions: [{ fieldName: dimensionName }],
    patterns,
  } = insight;
  const { baselines, thresholds } = patterns[0];

  const intervalData = chartData.map((datum, index) => ({
    x: datum[dimensionName],
    y0: baselines[index] - Math.abs(thresholds[0]),
    y1: baselines[index] + thresholds[1],
  }));
  const baselineData = chartData.map((datum, index) => ({ x: datum[dimensionName], y: baselines[index] }));

  return [
    {
      trendLine: [lineMarkStrategy(baselineData, { role: 'baseline', name: 'baseline', smooth: true })],
      anomalyArea: [areaMarkStrategy(intervalData, { role: 'band', name: 'interval', smooth: true })],
      outliers: [pointMarkStrategy(patterns, { role: 'outlier', name: 'outlier' })],
    },
  ];
};

export const timeSeriesOutlierStrategy = (insight: InsightInfo<TimeSeriesOutlierInfo>): InsightChartMark[] => {
  const chartMark = insight2ChartStrategy(insight);
  const {
    trendLine = [],
    anomalyArea = [],
    outliers = [],
  } = timeSeriesOutlierStrategyAugmentedMarksStrategy(insight)[0] || {};
  return [...anomalyArea, ...trendLine, chartMark, ...outliers];
};
