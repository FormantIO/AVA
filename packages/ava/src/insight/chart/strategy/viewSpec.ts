import type { InsightInfo, InsightType, PatternInfo } from '../../types';
import type { InsightChartMark, InsightChartSpec } from '../types';

type ViewInsight = Pick<InsightInfo<PatternInfo>, 'dimensions' | 'measures'> & { patterns: { type: InsightType }[] };

export const viewSpecStrategy = (marks: InsightChartMark[], insight: ViewInsight): InsightChartSpec => {
  const validMarks = marks.filter(Boolean);
  const { type: insightType } = insight.patterns[0] ?? {};

  if (insightType === 'majority') {
    return { coordinate: 'polar', marks: validMarks };
  }

  if (insightType === 'correlation') {
    return {
      coordinate: 'cartesian',
      x: { field: insight.measures[0]?.fieldName, type: 'value' },
      y: { field: insight.measures[1]?.fieldName, type: 'value' },
      marks: validMarks,
    };
  }

  return {
    coordinate: 'cartesian',
    x: { field: insight.dimensions[0]?.fieldName, type: 'category' },
    y: { field: insight.measures[0]?.fieldName, type: 'value' },
    marks: validMarks,
  };
};
