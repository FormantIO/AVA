import styled from 'styled-components';

import { getFontSize } from '../theme';
import { cardToken } from '../../InsightCard/cardTheme';

import type { ThemeStylesProps } from '../types';

export const Entity = styled.span<ThemeStylesProps>`
  align-items: center;
  box-sizing: border-box;
  font-size: ${({ size }) => getFontSize(size)};
  font-family: ${cardToken('font', 'Roboto-Medium, PingFangSC, sans-serif')};
  font-weight: ${cardToken('entity.fontWeight', 'inherit')};
  border-radius: 2px;
  color: ${cardToken('entity.color', 'var(--color-text-primary)')};
  margin: 0 1px;
  overflow-wrap: break-word;
`;
