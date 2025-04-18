import styled from 'styled-components';

import { getThemeColor, getFontSize, getLineHeight } from '../theme';

import type { TextParagraphSpec } from '@formant/ava';
import type { ThemeStylesProps } from '../types';

export const P = styled.p<ThemeStylesProps & Pick<TextParagraphSpec, 'indents'>>`
  white-space: pre-wrap; // 默认 pre 显示，可以显示空格和转义字符
  font-family: PingFangSC, sans-serif;
  color: var(--color-text-primary);
  font-size: 12px;
  min-height: 24px;
      font-size: 16px;
      line-height: 24px;
  margin-bottom: 4px;
  text-indent: ${({ indents }) => indents?.find((item) => item.type === 'first-line')?.length};
  padding-left: ${({ indents }) => indents?.find((item) => item.type === 'left')?.length};
  padding-right: ${({ indents }) => indents?.find((item) => item.type === 'right')?.length};
  span {
    font-size: 15px;
    line-height: 24px;
  }
`;
