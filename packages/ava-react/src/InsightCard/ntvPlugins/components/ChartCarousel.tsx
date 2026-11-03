import React, { useState } from 'react';

import { INSIGHT_CARD_PREFIX_CLS } from '../../constants';
import { InsightChart } from '../../../InsightChart';

import type { InsightChartSpec } from '@formant/ava';

export const ChartCarousel = ({
  charts,
  height,
  width,
}: {
  charts: InsightChartSpec[];
  /** overrides the height from the enclosing `InsightChartProvider` */
  height?: number;
  width?: number;
}) => {
  const [selectedChartIndex, setSelectedCardIndex] = useState(0);

  const onSelect = (value: number) => {
    setSelectedCardIndex(value);
  };

  const chartsOptions = charts.map((chart, index) => {
    return {
      label: (
        <span
          style={{
            border: index === selectedChartIndex ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.15)',
            borderRadius: '2px',
            display: 'inline-block',
            width: index === selectedChartIndex ? '8px' : '12px',
            height: '8px',
            backgroundColor: index === selectedChartIndex ? 'rgba(0,0,0,0.15)' : '#fff',
            cursor: 'pointer',
            margin: '2px',
          }}
          onClick={() => {
            onSelect(index);
          }}
        ></span>
      ),
      value: index,
    };
  });

  return (
    <div className={`${INSIGHT_CARD_PREFIX_CLS}-chart-carousel`}>
      <InsightChart
        className={`${INSIGHT_CARD_PREFIX_CLS}-chart-container`}
        spec={charts[selectedChartIndex]}
        height={height}
        width={width}
      />
      {chartsOptions.length > 1 && (
        <div style={{ textAlign: 'center' }}>
          {chartsOptions.map((option) => (
            <span key={option.value}>{option.label}</span>
          ))}
        </div>
      )}
    </div>
  );
};
