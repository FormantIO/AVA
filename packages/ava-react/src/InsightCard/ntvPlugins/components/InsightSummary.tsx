import React from 'react';

import { AlertCircle } from 'lucide-react';

import { TextLine } from '../../../NarrativeTextVis/paragraph/TextLine';
import { Alert, AlertDescription, AlertTitle, AlertTitleRow } from '../../Title/customStyled';
import { useInsightCardPluginManager } from '../context';

import type { ThemeStylesProps } from '../../../NarrativeTextVis/types';
import type { InsightSummarySchema } from '../types';

export const InsightSummary = ({ spec, themeStyles }: { spec: InsightSummarySchema; themeStyles?: ThemeStylesProps }) => {
  const pluginManager = useInsightCardPluginManager();
  return (
    <Alert className={spec.className} style={spec.styles}>
      <AlertTitleRow>
        <AlertCircle size={16} />
        <AlertTitle>{spec.title}</AlertTitle>
      </AlertTitleRow>
      <AlertDescription as="div">
        <TextLine spec={spec.paragraph} pluginManager={pluginManager} {...themeStyles} />
      </AlertDescription>
    </Alert>
  );
};
