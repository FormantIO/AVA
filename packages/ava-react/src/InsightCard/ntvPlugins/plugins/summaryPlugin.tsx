import React from 'react';

import { createCustomBlockFactory } from '../../../NarrativeTextVis';
import { INSIGHT_SUMMARY_PLUGIN_KEY } from '../../constants';
import { InsightSummary } from '../components/InsightSummary';
import { InsightSummarySchema } from '../types';

/** titled box around an insight's leading sentence */
export const insightSummaryPlugin = createCustomBlockFactory<InsightSummarySchema>({
  key: INSIGHT_SUMMARY_PLUGIN_KEY,
  render(item, themeStyles) {
    return <InsightSummary spec={item} themeStyles={themeStyles} />;
  },
});
