import type { InsightRuleYMark } from '../../types';

export const ruleYMarkStrategy = (y: number, config: Omit<InsightRuleYMark, 'type' | 'y'>): InsightRuleYMark => ({
  type: 'ruleY',
  y,
  ...config,
});
