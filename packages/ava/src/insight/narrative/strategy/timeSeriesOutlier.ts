/* eslint-disable no-template-curly-in-string */
import { first, last, maxBy, minBy } from 'lodash';

import { generateTextSpec } from '../../../ntv';

import { InsightNarrativeStrategy } from './base';
import { getDiffDesc } from './helpers';

import type { InsightType, Language, InsightInfo, TimeSeriesOutlierInfo } from '../../types';
import type { ParagraphSpec, Structure } from '../../../ntv/types';
import { formatDateRange } from "little-date";
import { format } from 'date-fns';

const variableMetaMap = {
  dateRange: {
    varType: 'time_desc',
  },
  measure: {
    varType: 'metric_name',
  },
  max: {
    varType: 'metric_value',
  },
  min: {
    varType: 'metric_value',
  },
  total: {
    varType: 'metric_value',
  },
  '.x': {
    varType: 'dim_value',
  },
  '.y': {
    varType: 'metric_value',
  },
  '.base': {
    varType: 'metric_value',
  },
  '.diff': {
    varType: 'delta_value',
  },
};

export default class TimeSeriesOutlierNarrativeStrategy extends InsightNarrativeStrategy<TimeSeriesOutlierInfo> {
  static readonly insightType: InsightType = 'time_series_outlier';

  protected static structures: Record<Language, Structure[]> = {
    'zh-CN': [
      {
        template:
          '${dateRange}，${measure} 波动范围为最大值 ${max}, 最小值 ${min}，有 ${total} 个异常点，按超过基线大小排序如下：',
        variableMetaMap,
      },
      {
        template: '${.x}，${measure} 为 ${.y}, 相比基线（${.base}）${.diffDesc} ${.diff}。',
        displayType: 'bullet',
        bulletOrder: true,
        useVariable: 'outliers',
        variableMetaMap,
      },
    ],
    'en-US': [
      {
        template:
          '${total} outliers detected for ${measure} during ${dateRange}',
        displayType: 'paragraph',
        variableMetaMap,
      },
      {
        template: '${.x}: ${measure} at ${.y} (${.diffDesc} ${.diff} baseline)',
        displayType: 'bullet',
        bulletOrder: true,
        useVariable: 'outliers',
        variableMetaMap,  
      },
    ],
  };

  generateTextSpec(insightInfo: InsightInfo<TimeSeriesOutlierInfo>, lang: Language) {
    const { patterns, data } = insightInfo;
    const { measure, dimension } = patterns[0];

    const spec = generateTextSpec({
      structures: TimeSeriesOutlierNarrativeStrategy.structures[lang],
      variable: {
        dateRange: `${formatDateRange(new Date(first(data)[dimension]), new Date(last(data)[dimension]), {includeTime: false})}`,
        total: patterns.length,
        measure,
        max: maxBy(data, measure)[measure],
        min: minBy(data, measure)[measure],
        outliers: patterns.map((point) => {
          const base = point.baselines[point.index];
          const diff = point.y - base;
          return {
            ...point,
            base,
            diffDesc: getDiffDesc(diff, lang),
            x: format(new Date(point.x), 'MMM d, yyyy'),
            diff,
          };
        }),
      },
    });

    return spec.sections[0].paragraphs as ParagraphSpec[];
  }
}
