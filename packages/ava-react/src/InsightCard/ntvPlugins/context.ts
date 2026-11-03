import { createContext, useContext } from 'react';

import { presetPluginManager } from '../../NarrativeTextVis/chore/plugin';

import type { NtvPluginManager } from '../../NarrativeTextVis';

/**
 * The card's plugin manager, for blocks that render nested narrative text: block `render` only
 * receives its spec, so custom phrase plugins would otherwise be lost inside them.
 */
export const InsightCardPluginManagerContext = createContext<NtvPluginManager>(presetPluginManager);

export const useInsightCardPluginManager = () => useContext(InsightCardPluginManagerContext);
