import styled from 'styled-components';

import { cardToken } from '../../InsightCard/cardTheme';

import type { TextParagraphSpec } from '@formant/ava';
import type { ThemeStylesProps } from '../types';

export const P = styled.p<ThemeStylesProps & Pick<TextParagraphSpec, 'indents'>>`
  white-space: pre-wrap; // 默认 pre 显示，可以显示空格和转义字符
  font-family: ${cardToken('font', 'PingFangSC, sans-serif')};
  color: ${cardToken('summary.textColor', 'var(--color-text-primary)')};
  min-height: 24px;
  font-size: ${cardToken('summary.textFontSize', '16px')};
  line-height: ${cardToken('summary.textLineHeight', '24px')};
  margin-bottom: 4px;
  text-indent: ${({ indents }) => indents?.find((item) => item.type === 'first-line')?.length};
  padding-left: ${({ indents }) => indents?.find((item) => item.type === 'left')?.length};
  padding-right: ${({ indents }) => indents?.find((item) => item.type === 'right')?.length};
  span {
    font-size: ${cardToken('summary.textFontSize', '15px')};
    line-height: ${cardToken('summary.textLineHeight', '24px')};
  }
`;
