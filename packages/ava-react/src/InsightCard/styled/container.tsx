import styled from 'styled-components';

import { cardToken } from '../cardTheme';

const DEFAULT_FONT = `Moderat, roboto-regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

export const Container = styled.div`
  margin-bottom: 8px;
  padding: ${cardToken('card.padding', '8px')};
  font-size: 12px;
  font-family: ${cardToken('font', DEFAULT_FONT)};
  background-color: ${cardToken('card.background', 'var(--formant-primary-module)')};
  border-radius: ${cardToken('card.radius', '6px')};
  border: ${cardToken('card.borderWidth', '2px')} solid ${cardToken('card.border', 'var(--color-border-primary)')};
`;
