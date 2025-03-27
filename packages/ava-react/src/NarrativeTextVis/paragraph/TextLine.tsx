import React from 'react';

import { NTV_PREFIX_CLS } from '../constants';
import { P as StyledP } from '../styled';
import { Phrases } from '../phrases';
import { classnames as cx } from '../../utils';
import { presetPluginManager } from '../chore/plugin';

import type { TextParagraphSpec } from '@formant/ava';
import type { ThemeStylesProps, ExtensionProps, PhraseEvents } from '../types';
import { AlertDescription, AlertTitle } from '../../InsightCard/Title/customStyled';
import { Alert, AlertTitleRow } from '../../InsightCard/Title/customStyled';
import { AlertCircle } from 'lucide-react';

type TextLineProps = ThemeStylesProps &
  Pick<ExtensionProps, 'pluginManager'> &
  PhraseEvents & {
    spec: TextParagraphSpec;
  };

export function TextLine({
  spec,
  size = 'normal',
  theme = 'dark',
  palette,
  pluginManager = presetPluginManager,
  ...events
}: TextLineProps) {
  const themeStyles = { size, theme, palette };
  let baseText = "Anamoly was detected";
  if (JSON.stringify(spec).includes("outliers")) {
    baseText = "Time Series Outlier Detected";
  }
  return (
    <Alert>
         <AlertTitleRow>
         <AlertCircle size={16} color="#ef4444" />
         <AlertTitle>{baseText}</AlertTitle>
         </AlertTitleRow>
            <AlertDescription>
    <StyledP
      {...themeStyles}
      indents={spec.indents}
      className={cx(`${NTV_PREFIX_CLS}-p`, spec.className)}
      style={spec.styles}
    >
      <Phrases spec={spec.phrases} pluginManager={pluginManager} {...themeStyles} {...events} />
      </StyledP>
      </AlertDescription>
     
      </Alert>
     
    )
}
