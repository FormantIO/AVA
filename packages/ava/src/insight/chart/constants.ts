import { ChartType, InsightType } from '../types';

export const INSIGHT_COLOR_PLATTE: Record<string, string> = {
  highlight: '#f89973',
  outlier: '#ea719d',
  font: '#bac4e2',
  defaultPointColor: '#fff',
} as const;

export const BOLD_FONT_WEIGHT = 500;

export const TEXT_STYLE = {
  textAlign: 'center',
  fill: INSIGHT_COLOR_PLATTE.font,
  fontFamily: 'Moderat',
  opacity: 0.85,
};

export const ChartTypeMap: Record<InsightType, ChartType> = {
  category_outlier: 'column_chart',
  trend: 'line_chart',
  change_point: 'line_chart',
  time_series_outlier: 'line_chart',
  majority: 'pie_chart',
  low_variance: 'column_chart',
  correlation: 'scatter_plot',
};

export const PIE_RADIUS_STYLE = {
  innerRadius: 0.25,
  outerRadius: 0.8,
};
