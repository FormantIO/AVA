import React from 'react';

import { NTV_PREFIX_CLS } from '../constants';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { classnames as cx } from '../../utils';
import { presetPluginManager } from '../chore/plugin';

import type { HeadlineSpec } from '@formant/ava';
import type { ExtensionProps, ParagraphEvents, ThemeStylesProps } from '../types';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle, AlertTitleRow } from '../../InsightCard/Title/customStyled';


type HeadlineProps = Pick<ExtensionProps, 'pluginManager'> &
  ThemeStylesProps &
  ParagraphEvents & {
    spec: HeadlineSpec;
  };

export function Headline({
  spec,
  pluginManager = presetPluginManager,
  size = 'normal',
  theme = 'dark',
  ...events
}: HeadlineProps) {
  const { onClickParagraph, onMouseEnterParagraph, onMouseLeaveParagraph, ...phraseEvents } = events || {};

  const themeStyles = { size, theme };

  const onClick = () => {
    onClickParagraph?.(spec);
  };

  const onMouseEnter = () => {
    onMouseEnterParagraph?.(spec);
  };

  const onMouseLeave = () => {
    onMouseLeaveParagraph?.(spec);
  };

  return (
    <Alert>
          <AlertTitleRow>
            <AlertCircle size={16} color="#ef4444" />
            <AlertTitle>Time Series Outlier Detected</AlertTitle>
          </AlertTitleRow>
          <AlertDescription>
    <StyledHeadline
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cx(`${NTV_PREFIX_CLS}-headline`, spec.className)}
      style={spec.styles}
      {...themeStyles}
    >
      <Phrases spec={spec.phrases} pluginManager={pluginManager} {...themeStyles} {...phraseEvents} />
    </StyledHeadline>
    </AlertDescription>
        </Alert>
  );
}
