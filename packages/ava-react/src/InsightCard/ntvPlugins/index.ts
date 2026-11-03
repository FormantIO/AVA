import { chartsDisplayPlugin } from './plugins/chartPlugin';
import { subspaceDescriptionPlugin } from './plugins/subspaceDescriptionPlugin';
import { insightSummaryPlugin } from './plugins/summaryPlugin';

import type { NtvPluginType } from '../../NarrativeTextVis';

export const insightCardPresetPluginsMap: Record<string, NtvPluginType> = {
  chartsDisplayPlugin,
  subspaceDescriptionPlugin,
  insightSummaryPlugin,
};

export const insightCardPresetPlugins: NtvPluginType[] = Object.values(insightCardPresetPluginsMap);
