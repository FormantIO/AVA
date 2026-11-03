import { InsightInfo, InsightType } from '../../types';
import { PIE_RADIUS } from '../constants';
import { InsightChartMark } from '../types';

type ChartInsight = Omit<InsightInfo, 'visualizationSpecs' | 'patterns'> & { patterns: { type: InsightType }[] };

/** the mark that draws the insight data itself */
export const insight2ChartStrategy = (insight: ChartInsight): InsightChartMark => {
  const { data, patterns, dimensions, measures } = insight;
  const { type: insightType } = patterns[0];
  const dimension = dimensions[0]?.fieldName;
  const measure = measures[0]?.fieldName;
  const points = () => data.map((datum) => ({ x: datum[dimension], y: Number(datum[measure]) }));

  // pie
  if (insightType === 'majority') {
    return {
      type: 'arc',
      role: 'primary',
      name: measure,
      data: data.map((datum) => ({ name: String(datum[dimension]), value: Number(datum[measure]) })),
      ...PIE_RADIUS,
    };
  }

  // line
  if (insightType === 'trend' || insightType === 'time_series_outlier' || insightType === 'change_point') {
    return { type: 'line', role: 'primary', name: measure, data: points() };
  }

  // bar
  if (insightType === 'category_outlier' || insightType === 'low_variance') {
    return { type: 'bar', role: 'primary', name: measure, data: points() };
  }

  // scatter
  if (insightType === 'correlation') {
    const yMeasure = measures[1]?.fieldName;
    return {
      type: 'point',
      role: 'primary',
      name: `${measure} / ${yMeasure}`,
      data: data.map((datum) => ({ x: Number(datum[measure]), y: Number(datum[yMeasure]) })),
    };
  }
  return null;
};
