/* eslint-disable no-template-curly-in-string */
import { generateTextSpec } from '../../../ntv';

import { InsightNarrativeStrategy } from './base';

import type { InsightType, Language, InsightInfo, LowVarianceInfo } from '../../types';
import type { ParagraphSpec, Structure } from '../../../ntv/types';

const variableMetaMap = {
  measure: {
    varType: 'metric_name',
  },
  mean: {
    varType: 'metric_value',
  },
};

export default class LowVarianceNarrativeStrategy extends InsightNarrativeStrategy<LowVarianceInfo> {
  static readonly insightType: InsightType = 'low_variance';

  protected static structures: Record<Language, Structure[]> = {
    'zh-CN': [
      {
        template: '按照 ${dimension} 对 ${measure} 进行拆解，指标分布均匀，平均为 ${mean}。',
        variableMetaMap,
      },
    ],
    'en-US': [
      {
        template:
          'We broke down the total based on ${dimension}, and the ${measure} are spread out evenly, averaging ${mean} each.',
        variableMetaMap,
      },
    ],
  };

  generateTextSpec(insightInfo: InsightInfo<LowVarianceInfo>, lang: Language) {
    const { patterns } = insightInfo;
    const { dimension, measure, mean } = patterns[0];
    const spec = generateTextSpec({
      structures: LowVarianceNarrativeStrategy.structures[lang],
      variable: {
        dimension,
        measure,
        mean,
      },
    });

    return spec.sections[0].paragraphs as ParagraphSpec[];
  }
}
