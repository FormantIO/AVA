import { Subspace, generateInsightVisualizationSpec, isTextParagraph } from '@formant/ava';

import {
  DISPLAY_CHARTS_PLUGIN_KEY,
  INSIGHT_SUMMARY_PLUGIN_KEY,
  SUBSPACE_DESCRIPTION_PLUGIN_KEY,
  SUMMARY_TITLE_MAP,
  SUMMARY_TITLE_MAP_ZH,
} from '../constants';

import type {
  InsightChartSpec,
  InsightType,
  NarrativeTextSpec,
  ParagraphSpec,
  InsightInfo,
  InsightVisualizationOptions,
} from '@formant/ava';
import type { InsightSummarySchema } from '../ntvPlugins/types';

/** box the first sentence of an insight's narrative under a headline naming the insight type */
const withSummary = (
  paragraphs: ParagraphSpec[] = [],
  insightType: InsightType,
  lang: InsightVisualizationOptions['lang']
): ParagraphSpec[] => {
  const index = paragraphs.findIndex(isTextParagraph);
  if (index < 0) return paragraphs;
  const summary: InsightSummarySchema = {
    type: 'custom',
    customType: INSIGHT_SUMMARY_PLUGIN_KEY,
    title: (lang === 'zh-CN' ? SUMMARY_TITLE_MAP_ZH : SUMMARY_TITLE_MAP)[insightType],
    paragraph: paragraphs[index] as InsightSummarySchema['paragraph'],
  };
  return [...paragraphs.slice(0, index), summary as ParagraphSpec, ...paragraphs.slice(index + 1)];
};

/**
 * generate description of data subspace (the conditions of data subset)
 * 描述数据子空间
 */
export const getSubspaceDescriptionSpec = (subspace: Subspace = []): ParagraphSpec => {
  const conditionDescriptions = subspace.map((condition) => {
    const { dimension, value } = condition;
    return `${dimension}=${value}`;
  });
  return {
    type: 'normal',
    phrases: [
      {
        type: 'custom',
        value: conditionDescriptions.join(','),
        metadata: {
          customType: SUBSPACE_DESCRIPTION_PLUGIN_KEY,
        },
      },
    ],
  };
};

/** generate narrative paragraphs and visualizations for insight data */
export const generateContentVisSpec = (
  insightInfo: InsightInfo,
  visualizationOptions: InsightVisualizationOptions
): NarrativeTextSpec => {
  if (!insightInfo) return {};
  const visualizationSpecs = generateInsightVisualizationSpec(insightInfo, visualizationOptions);

  if (visualizationSpecs) {
    const narrativeParagraphs: ParagraphSpec[] = [];
    const chartSpecs: InsightChartSpec[] = [];

    if (insightInfo.subspace?.length) {
      // const subspaceDescriptionSpec = getSubspaceDescriptionSpec(insightInfo.subspace);
      // narrativeParagraphs.push(subspaceDescriptionSpec);
    }

    visualizationSpecs.forEach((visualizationSpec) => {
      const { narrativeSpec, chartSpec, patternType } = visualizationSpec;
      narrativeParagraphs.push(...withSummary(narrativeSpec, patternType, visualizationOptions?.lang));
      // homogeneous insights have no chart
      if (chartSpec) chartSpecs.push(chartSpec);
    });

    const insightContentSpec: NarrativeTextSpec = {
      sections: [
        {
          paragraphs: [
            ...narrativeParagraphs,
            {
              type: 'custom',
              customType: DISPLAY_CHARTS_PLUGIN_KEY,
              chartSpecs,
            },
          ],
        },
      ],
    };
    return insightContentSpec;
  }

  return {};
};
